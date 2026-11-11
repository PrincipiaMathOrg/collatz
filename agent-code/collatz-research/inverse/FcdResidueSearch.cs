using System;
using System.Collections.Generic;
using System.Numerics;

// Searches the reduced-modulus formulation of First-Crossing Descent.
// If d=Z-rho, then d == C*3^{-s} (mod D), where D=2^k-3^s, and
// -D<d<s/3.  A tempting sufficient claim is that the least residue tau is
// at least s/3.  This program tests that claim exactly.
public static class FcdResidueSearch
{
    sealed class Stats
    {
        public long Count, SmallTau, SmallTauNegative, SmallTauNonnegative;
        public BigInteger MinTau = -1, MinTauC, MinTauRho, MinTauZ;
        public string MinTauWord = "";
        public int Ones;
        public string FirstSmallTau = "";
        public long Moves, TauUp, TauDown, TauEqual;
        public string FirstTauDown = "";
    }
    static Dictionary<int, Stats> stats = new Dictionary<int, Stats>();

    static BigInteger Mod(BigInteger x, BigInteger m)
    {
        x %= m; return x.Sign < 0 ? x + m : x;
    }
    static BigInteger Inv(BigInteger a, BigInteger m)
    {
        BigInteger t = 0, nt = 1, r = m, nr = Mod(a, m);
        while (nr != 0)
        {
            BigInteger q = r / nr;
            BigInteger x = t - q * nt; t = nt; nt = x;
            x = r - q * nr; r = nr; nr = x;
        }
        if (r != 1) throw new Exception("inverse");
        return Mod(t, m);
    }
    static BigInteger CarryOf(string word)
    {
        BigInteger c = 0; int j = 0;
        foreach (char bit in word)
        {
            if (bit == '1') c = 3 * c + (BigInteger.One << j);
            ++j;
        }
        return c;
    }
    static bool IsPrimitive(string word)
    {
        BigInteger p3 = 1, p2 = 1;
        for (int i = 0; i < word.Length; ++i)
        {
            if (word[i] == '1') p3 *= 3;
            p2 *= 2;
            if (i + 1 < word.Length && p3 < p2) return false;
        }
        return p3 < p2;
    }
    static void Record(string word, int s, BigInteger C)
    {
        int k = word.Length;
        BigInteger M = BigInteger.One << k;
        BigInteger P = BigInteger.Pow(3, s);
        BigInteger D = M - P;
        BigInteger rho = Mod(-C * Inv(P, M), M);
        BigInteger Z = (P * rho + C) / M;
        BigInteger tau = D == 1 ? BigInteger.Zero : Mod(C * Inv(P, D), D);
        BigInteger d = Z - rho;
        if (D != 1 && Mod(d, D) != tau) throw new Exception("residue mismatch");
        Stats st;
        if (!stats.TryGetValue(k, out st)) { st = new Stats(); stats[k] = st; }
        ++st.Count;
        if (st.MinTau < 0 || tau < st.MinTau)
        {
            st.MinTau = tau; st.MinTauC = C; st.MinTauWord = word;
            st.MinTauRho = rho; st.MinTauZ = Z; st.Ones = s;
        }
        if (3 * tau < s)
        {
            ++st.SmallTau;
            if (d < 0) ++st.SmallTauNegative;
            else ++st.SmallTauNonnegative;
            if (st.FirstSmallTau.Length == 0)
                st.FirstSmallTau = word + ":tau=" + tau + ":d=" + d;
        }
        for (int i = 0; i + 1 < k; ++i)
        {
            if (word[i] != '1' || word[i + 1] != '0') continue;
            char[] chars = word.ToCharArray(); chars[i] = '0'; chars[i + 1] = '1';
            string moved = new string(chars);
            if (!IsPrimitive(moved)) continue;
            BigInteger movedC = CarryOf(moved);
            BigInteger movedTau = D == 1 ? BigInteger.Zero : Mod(movedC * Inv(P, D), D);
            ++st.Moves;
            int cmp = movedTau.CompareTo(tau);
            if (cmp > 0) ++st.TauUp;
            else if (cmp < 0)
            {
                ++st.TauDown;
                if (st.FirstTauDown.Length == 0)
                    st.FirstTauDown = word + "->" + moved + ":" + tau + "->" + movedTau;
            }
            else ++st.TauEqual;
        }
    }
    static void Dfs(int max, string w, int s, BigInteger p3, BigInteger p2, BigInteger C)
    {
        if (w.Length >= max) return;
        BigInteger p2n = p2 << 1;
        if (p3 < p2n) Record(w + "0", s, C);
        else Dfs(max, w + "0", s, p3, p2n, C);
        Dfs(max, w + "1", s + 1, p3 * 3, p2n, 3 * C + p2);
    }
    static void Main(string[] args)
    {
        int max = args.Length > 0 ? int.Parse(args[0]) : 25;
        Dfs(max, "", 0, 1, 1, 0);
        Console.WriteLine("k count s minTau rho z minWord smallTau smallNeg smallNonneg moves up down equal firstDown firstSmall");
        foreach (KeyValuePair<int, Stats> pair in stats)
        {
            Stats x = pair.Value;
            Console.WriteLine(pair.Key + " " + x.Count + " " + x.Ones + " " + x.MinTau + " " +
                x.MinTauRho + " " + x.MinTauZ + " " + x.MinTauWord + " " + x.SmallTau + " " +
                x.SmallTauNegative + " " + x.SmallTauNonnegative + " " + x.Moves + " " + x.TauUp + " " +
                x.TauDown + " " + x.TauEqual + " " + x.FirstTauDown + " " + x.FirstSmallTau);
        }
    }
}
