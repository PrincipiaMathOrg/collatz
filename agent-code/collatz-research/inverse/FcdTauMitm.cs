using System;
using System.Collections.Generic;
using System.Numerics;
using System.Security.Cryptography;
using System.Text;

// Exact meet-in-the-middle search for a small reduced residue in a primitive
// first-crossing word.  For fixed weight s, the terminal length is uniquely
// k=ceil(s log_2 3).  Writing the one positions as
//
//   0=A_0<A_1<...<A_{s-1},
//
// first crossing is equivalent to 2^{A_i}<=3^i for every i<s.  Put
// D=2^k-3^s and
//
//   tau = [ C (3^s)^{-1} ]_D,
//   C   = sum_i 2^{A_i} 3^{s-1-i}.
//
// The search splits positions at h=floor(k/2), enumerates the two halves
// independently for each possible number u of left-hand ones.  After
// premultiplying each carry summand by (3^s)^{-1} modulo D, a sorted-table
// nearest-wrap query finds the exact minimum tau over every compatible pair.
// All arithmetic defining the modular weights and all final witness checks
// use BigInteger.  The ulong tables are used only when k<=64 and 2D fits in
// ulong, so every reduced residue and every sum of two residues fits.
public static class FcdTauMitm
{
    sealed class LeftTable
    {
        public readonly Dictionary<ulong, ulong> Representative =
            new Dictionary<ulong, ulong>();
        public ulong[] SortedResidues;
        public ulong Words;
    }

    static int s, k, h;
    static ulong d;
    static int[] maxPosition;
    static ulong[,] weight;
    static ulong globalMinTau = ulong.MaxValue;
    static string globalMinWitness = "";

    static BigInteger Mod(BigInteger x, BigInteger m)
    {
        x %= m;
        return x.Sign < 0 ? x + m : x;
    }

    static BigInteger Inv(BigInteger a, BigInteger m)
    {
        BigInteger t = 0, nt = 1, r = m, nr = Mod(a, m);
        while (nr != 0)
        {
            BigInteger q = r / nr;
            BigInteger z = t - q * nt; t = nt; nt = z;
            z = r - q * nr; r = nr; nr = z;
        }
        if (r != 1) throw new Exception("inverse does not exist");
        return Mod(t, m);
    }

    static ulong AddMod(ulong a, ulong b)
    {
        ulong z = a + b;
        return z >= d ? z - d : z;
    }

    static ulong SubMod(ulong a, ulong b)
    {
        return a >= b ? a - b : d - (b - a);
    }

    static void AddLeft(LeftTable table, ulong residue, ulong mask)
    {
        ++table.Words;
        if (!table.Representative.ContainsKey(residue))
            table.Representative.Add(residue, mask);
    }

    static void EnumerateLeft(LeftTable table, int u, int rank, int next,
        ulong residue, ulong mask)
    {
        if (rank == u)
        {
            AddLeft(table, residue, mask);
            return;
        }
        int upper = maxPosition[rank];
        if (upper >= h) upper = h - 1;
        int leave = u - rank - 1;
        if (upper > h - 1 - leave) upper = h - 1 - leave;
        for (int p = next; p <= upper; ++p)
            EnumerateLeft(table, u, rank + 1, p + 1,
                AddMod(residue, weight[rank, p]), mask | (1UL << p));
    }

    static int LowerBound(ulong[] values, ulong targetValue)
    {
        int lo = 0, hi = values.Length;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (values[mid] < targetValue) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }

    static void TestCandidate(LeftTable table, int u, ulong rightResidue,
        ulong rightMask, ulong leftResidue)
    {
        ulong tau = AddMod(leftResidue, rightResidue);
        if (tau >= globalMinTau) return;
        ulong leftMask = table.Representative[leftResidue];
        string witness = Verify(leftMask | rightMask, tau, "MINIMUM", u);
        globalMinTau = tau;
        globalMinWitness = witness;
    }

    static void CheckPair(LeftTable table, int u, ulong rightResidue,
        ulong rightMask)
    {
        // For sorted left residues, the minimum of (left+right) mod D occurs
        // either at the smallest nonwrapping sum or immediately after the
        // unique wrap threshold D-right.
        ulong[] values = table.SortedResidues;
        if (rightResidue == 0)
        {
            TestCandidate(table, u, rightResidue, rightMask, values[0]);
            return;
        }
        ulong threshold = d - rightResidue;
        int atWrap = LowerBound(values, threshold);
        if (atWrap < values.Length)
            TestCandidate(table, u, rightResidue, rightMask, values[atWrap]);
        if (atWrap > 0)
            TestCandidate(table, u, rightResidue, rightMask, values[0]);
    }

    static void EnumerateRight(LeftTable table, int u, int rank, int next,
        ulong residue, ulong mask, ref ulong words)
    {
        if (rank == s)
        {
            ++words;
            CheckPair(table, u, residue, mask);
            return;
        }
        int upper = maxPosition[rank];
        int leave = s - rank - 1;
        if (upper > k - 1 - leave) upper = k - 1 - leave;
        for (int p = next; p <= upper; ++p)
            EnumerateRight(table, u, rank + 1, p + 1,
                AddMod(residue, weight[rank, p]), mask | (1UL << p),
                ref words);
    }

    static string Verify(ulong mask, ulong claimedTau, string kind, int u)
    {
        int count = 0;
        BigInteger C = 0;
        BigInteger p3prefix = 1;
        BigInteger p2prefix = 1;
        char[] word = new char[k];
        for (int p = 0; p < k; ++p)
        {
            bool one = (mask & (1UL << p)) != 0;
            word[p] = one ? '1' : '0';
            if (one)
            {
                C = 3 * C + (BigInteger.One << p);
                ++count;
                p3prefix *= 3;
            }
            p2prefix <<= 1;
            if (p + 1 < k && p3prefix < p2prefix)
                throw new Exception("reconstructed word crosses early");
        }
        if (count != s || !(p3prefix < p2prefix))
            throw new Exception("reconstructed word has wrong endpoint");
        BigInteger P = BigInteger.Pow(3, s);
        BigInteger D = (BigInteger.One << k) - P;
        BigInteger tau = Mod(C * Inv(P, D), D);
        if (tau != claimedTau)
            throw new Exception("MITM false match");
        BigInteger margin = (BigInteger.One << k) * tau - C;
        string record = "s=" + s + ";k=" + k + ";tau=" + tau +
            ";C=" + C + ";margin=" + margin + ";word=" + new string(word);
        return kind + ":u=" + u + ":" + record + ":sha256=" +
            Sha256(record);
    }

    static string Sha256(string value)
    {
        using (SHA256 sha = SHA256.Create())
        {
            byte[] digest = sha.ComputeHash(Encoding.ASCII.GetBytes(value));
            StringBuilder text = new StringBuilder(64);
            for (int i = 0; i < digest.Length; ++i)
                text.Append(digest[i].ToString("x2"));
            return text.ToString();
        }
    }

    static void Setup(int requestedS)
    {
        s = requestedS;
        BigInteger P = BigInteger.Pow(3, s);
        k = 0;
        while ((BigInteger.One << k) <= P) ++k;
        if (k > 64)
            throw new Exception("This exact mask implementation requires k<=64.");
        h = k / 2;
        BigInteger D = (BigInteger.One << k) - P;
        if (D <= 1) throw new Exception("Use s>=2; s=1 is boundary word 10.");
        if (2 * D > ulong.MaxValue)
            throw new Exception("This exact residue implementation requires 2D<=2^64-1.");
        d = (ulong)D;

        maxPosition = new int[s];
        BigInteger power3 = 1;
        int currentMax = 0;
        for (int i = 0; i < s; ++i)
        {
            while ((BigInteger.One << (currentMax + 1)) <= power3)
                ++currentMax;
            maxPosition[i] = currentMax;
            power3 *= 3;
        }

        weight = new ulong[s, k];
        BigInteger[] threeTail = new BigInteger[s];
        threeTail[s - 1] = 1;
        for (int i = s - 2; i >= 0; --i) threeTail[i] = 3 * threeTail[i + 1];
        for (int i = 0; i < s; ++i)
            for (int p = 0; p < k; ++p)
                weight[i, p] = (ulong)Mod((BigInteger.One << p) * threeTail[i], D);

        BigInteger inverseP = Inv(P, D);
        for (int i = 0; i < s; ++i)
            for (int p = 0; p < k; ++p)
                weight[i, p] = (ulong)Mod((BigInteger)weight[i, p] * inverseP, D);
    }

    public static void Main(string[] args)
    {
        int requestedS = args.Length > 0 ? int.Parse(args[0]) : 24;
        Setup(requestedS);
        Console.WriteLine("s=" + s + " k=" + k + " split=" + h +
            " D=" + d + " sufficientBoundExceptions=0.." +
            ((s - 1) / 3));
        ulong totalLeft = 0, totalRight = 0;
        for (int u = 1; u <= s; ++u)
        {
            // Every admissible word starts with its rank-zero one at position 0.
            if (u > h || u - 1 > maxPosition[u - 1]) continue;
            if (u < s && maxPosition[u] < h) continue;
            LeftTable table = new LeftTable();
            EnumerateLeft(table, u, 1, 1, weight[0, 0], 1UL);
            if (table.Words == 0) continue;
            table.SortedResidues = new ulong[table.Representative.Count];
            table.Representative.Keys.CopyTo(table.SortedResidues, 0);
            Array.Sort(table.SortedResidues);
            ulong rightWords = 0;
            if (u == s)
                CheckPair(table, u, 0, 0);
            else
                EnumerateRight(table, u, u, h, 0, 0, ref rightWords);
            if (u == s) rightWords = 1;
            totalLeft += table.Words;
            totalRight += rightWords;
            Console.WriteLine("u=" + u + " leftWords=" + table.Words +
                " leftResidues=" + table.Representative.Count +
                " rightWords=" + rightWords + " runningMinTau=" +
                globalMinTau);
        }
        Console.WriteLine("totalLeftWords=" + totalLeft +
            " totalRightWords=" + totalRight);
        Console.WriteLine("minimumTau=" + globalMinTau);
        Console.WriteLine("minimumWitness=" + globalMinWitness);
        if (3 * globalMinTau >= (ulong)s)
            Console.WriteLine("CERTIFIED: every primitive first-crossing word of weight s=" +
                s + " satisfies 3*tau>=s, hence M*tau-C>0.");
        else
            Console.WriteLine("LOW-TAU EXCEPTION: inspect the exact margin in the witness.");
    }
}
