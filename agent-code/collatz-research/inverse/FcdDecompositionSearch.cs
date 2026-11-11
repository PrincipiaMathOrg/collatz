using System;
using System.Numerics;

// Tests induction heuristics obtained by cutting a primitive first-crossing
// word at its least positive coefficient height.  The suffix at that cut is
// itself primitive first-crossing.  The script looks for failures of naive
// monotonicity and additive tau bounds across this canonical decomposition.
public static class FcdDecompositionSearch
{
    struct Data
    {
        public int K, S;
        public BigInteger C, D, Tau, ShadowM, P, M, Rho, Z;
    }
    static BigInteger Mod(BigInteger x, BigInteger m)
    { x %= m; return x.Sign < 0 ? x + m : x; }
    static BigInteger Inv(BigInteger a, BigInteger m)
    {
        BigInteger t = 0, nt = 1, r = m, nr = Mod(a, m);
        while (nr != 0)
        {
            BigInteger q = r / nr;
            BigInteger z = t - q * nt; t = nt; nt = z;
            z = r - q * nr; r = nr; nr = z;
        }
        if (r != 1) throw new Exception("inverse");
        return Mod(t, m);
    }
    static Data GetData(string w)
    {
        Data x = new Data(); x.K = w.Length;
        BigInteger c = 0;
        for (int j = 0; j < w.Length; ++j)
            if (w[j] == '1') { c = 3 * c + (BigInteger.One << j); ++x.S; }
        BigInteger M = BigInteger.One << x.K;
        BigInteger P = BigInteger.Pow(3, x.S);
        x.M = M; x.P = P; x.C = c; x.D = M - P;
        x.Rho = Mod(-c * Inv(P, M), M);
        x.Z = (P * x.Rho + c) / M;
        x.Tau = x.D <= 1 ? BigInteger.Zero : Mod(c * Inv(P, x.D), x.D);
        x.ShadowM = x.D <= 1 ? BigInteger.Zero : (P * x.Tau - c) / x.D;
        return x;
    }
    // Returns the index j in [1,k-1] at which 3^{s_j}/2^j is least.
    static int LeastPositiveHeightCut(string w)
    {
        BigInteger p3 = 1, p2 = 1;
        BigInteger best3 = 0, best2 = 1;
        int best = -1;
        for (int j = 1; j < w.Length; ++j)
        {
            if (w[j - 1] == '1') p3 *= 3;
            p2 *= 2;
            if (best < 0 || p3 * best2 < best3 * p2)
            { best = j; best3 = p3; best2 = p2; }
        }
        return best;
    }

    static long count, nontrivialSuffix;
    static string firstFullTauBelowSuffix = "";
    static string firstAdditiveFailure = "";
    static string firstHalfBoundFailure = "";
    static string firstNegativeH = "";
    static string firstBaseAtLeastD = "";
    static string firstPositiveActualSuffixLift = "";
    static BigInteger largestActualSuffixLift = 0;
    static string largestActualSuffixLiftWord = "";
    static BigInteger worstDifference = 0;
    static string worstDifferenceWord = "";

    static void Record(string w)
    {
        ++count;
        Data full = GetData(w);
        if (full.S > 1 && 2 * full.Tau < full.S && firstHalfBoundFailure.Length == 0)
            firstHalfBoundFailure = w + ":s=" + full.S + ":tau=" + full.Tau;
        int cut = LeastPositiveHeightCut(w);
        if (cut < 0) return;
        string v = w.Substring(cut);
        Data suffix = GetData(v);
        if (suffix.S == 0 || suffix.D <= 1) return;
        ++nontrivialSuffix;
        BigInteger decompositionH = (full.ShadowM - suffix.ShadowM) / suffix.P;
        string prefixWord = w.Substring(0, cut);
        Data prefix = GetData(prefixWord);
        BigInteger Mu = BigInteger.One << prefix.K;
        BigInteger actualCut = (prefix.P * full.Rho + prefix.C) / Mu;
        BigInteger actualSuffixLift = (actualCut - suffix.Rho) / suffix.M;
        if (actualSuffixLift > 0 && firstPositiveActualSuffixLift.Length == 0)
            firstPositiveActualSuffixLift = w + ":cut=" + cut + ":t=" +
                actualSuffixLift + ":xcut=" + actualCut + ":Mv=" + suffix.M +
                ":prefix=" + prefixWord + ":suffix=" + v;
        if (actualSuffixLift > largestActualSuffixLift)
        {
            largestActualSuffixLift = actualSuffixLift;
            largestActualSuffixLiftWord = w + ":cut=" + cut + ":xcut=" +
                actualCut + ":Mv=" + suffix.M;
        }
        BigInteger baseNumerator = prefix.C - (prefix.P - Mu) * suffix.ShadowM +
            Mu * suffix.Tau;
        if (baseNumerator >= full.D && firstBaseAtLeastD.Length == 0)
            firstBaseAtLeastD = w + ":B=" + baseNumerator + ":D=" + full.D +
                ":h=" + decompositionH + ":prefix=" + prefixWord + ":suffix=" + v;
        if (decompositionH < 0 && firstNegativeH.Length == 0)
            firstNegativeH = w + ":m=" + full.ShadowM + ";" + v + ":m=" +
                suffix.ShadowM + ";h=" + decompositionH;
        if (full.Tau < suffix.Tau && firstFullTauBelowSuffix.Length == 0)
        {
            firstFullTauBelowSuffix = w + "=" + full.Tau + ",m=" + full.ShadowM +
                ";" + v + "=" + suffix.Tau + ",m=" + suffix.ShadowM + ";h=" + decompositionH;
        }
        // Naive induction would hope that the removed odd inputs contribute
        // at least one half-unit each.
        int removed = full.S - suffix.S;
        if (2 * (full.Tau - suffix.Tau) < removed && firstAdditiveFailure.Length == 0)
            firstAdditiveFailure = w + "=" + full.Tau + ";" + v + "=" + suffix.Tau +
                ";removed=" + removed;
        BigInteger difference = full.Tau - suffix.Tau;
        if (difference < worstDifference)
        { worstDifference = difference; worstDifferenceWord = w + ";suffix=" + v; }
    }
    static void Dfs(int max, string w, int s, BigInteger p3, BigInteger p2)
    {
        if (w.Length >= max) return;
        BigInteger p2n = p2 << 1;
        if (p3 < p2n) Record(w + "0");
        else Dfs(max, w + "0", s, p3, p2n);
        Dfs(max, w + "1", s + 1, p3 * 3, p2n);
    }
    static void Main(string[] args)
    {
        int max = args.Length > 0 ? int.Parse(args[0]) : 25;
        Dfs(max, "", 0, 1, 1);
        Console.WriteLine("words=" + count + " nontrivialSuffix=" + nontrivialSuffix);
        Console.WriteLine("firstFullTauBelowSuffix=" + firstFullTauBelowSuffix);
        Console.WriteLine("firstAdditiveFailure=" + firstAdditiveFailure);
        Console.WriteLine("firstHalfBoundFailure=" + firstHalfBoundFailure);
        Console.WriteLine("firstNegativeH=" + firstNegativeH);
        Console.WriteLine("firstBaseAtLeastD=" + firstBaseAtLeastD);
        Console.WriteLine("firstPositiveActualSuffixLift=" + firstPositiveActualSuffixLift);
        Console.WriteLine("largestActualSuffixLift=" + largestActualSuffixLift +
            " at " + largestActualSuffixLiftWord);
        Console.WriteLine("worstTauDifference=" + worstDifference + " at " + worstDifferenceWord);
    }
}
