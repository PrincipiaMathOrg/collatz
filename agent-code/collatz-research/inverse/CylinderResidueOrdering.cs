using System;
using System.Collections.Generic;
using System.Numerics;

// Exact finite audit of strict-barrier accelerated valuation cylinders.
// It tests whether cylinder injectivity is accompanied by any useful order
// or separation in the ordinary least representatives.
public static class CylinderResidueOrdering
{
    sealed class Entry
    {
        public BigInteger Rho, Carry;
        public string Word;
    }

    sealed class DepthStats
    {
        public long Count;
        public BigInteger MinRho = -1;
        public string MinWord = "";
        public Dictionary<int, List<Entry>> Groups =
            new Dictionary<int, List<Entry>>();
    }

    static int maxDepth;
    static int[] maxTotal;
    static DepthStats[] stats;

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
        if (r != 1) throw new Exception("inverse");
        return Mod(t, m);
    }

    static void Record(int depth, int total, BigInteger carry, string word)
    {
        BigInteger modulus = BigInteger.One << (total + 1);
        BigInteger rho = Mod((BigInteger.One << total) - carry, modulus);
        rho = Mod(rho * Inv(BigInteger.Pow(3, depth), modulus), modulus);
        if (rho.IsEven || rho <= 0) throw new Exception("bad cylinder residue");

        DepthStats st = stats[depth];
        ++st.Count;
        if (st.MinRho < 0 || rho < st.MinRho)
        {
            st.MinRho = rho;
            st.MinWord = word;
        }
        if (depth == maxDepth)
        {
            List<Entry> group;
            if (!st.Groups.TryGetValue(total, out group))
            {
                group = new List<Entry>();
                st.Groups.Add(total, group);
            }
            Entry e = new Entry(); e.Rho = rho; e.Carry = carry; e.Word = word;
            group.Add(e);
        }
    }

    static void Dfs(int depth, int total, BigInteger carry, string word)
    {
        if (depth == maxDepth) return;
        int nextDepth = depth + 1;
        int largestA = maxTotal[nextDepth] - total;
        for (int a = 1; a <= largestA; ++a)
        {
            BigInteger nextCarry = 3 * carry + (BigInteger.One << total);
            string nextWord = word.Length == 0 ? a.ToString() : word + "," + a;
            int nextTotal = total + a;
            Record(nextDepth, nextTotal, nextCarry, nextWord);
            Dfs(nextDepth, nextTotal, nextCarry, nextWord);
        }
    }

    static void AuditGroups()
    {
        string firstLexDown = "", firstLexUp = "", firstAdjacent = "";
        foreach (KeyValuePair<int, List<Entry>> pair in stats[maxDepth].Groups)
        {
            int total = pair.Key;
            List<Entry> entries = pair.Value;
            // DFS with increasing letters produces lexicographic word order.
            for (int i = 1; i < entries.Count; ++i)
            {
                if (entries[i].Rho < entries[i - 1].Rho && firstLexDown.Length == 0)
                    firstLexDown = "A=" + total + ":" + entries[i - 1].Word +
                        ":rho=" + entries[i - 1].Rho + " -> " + entries[i].Word +
                        ":rho=" + entries[i].Rho;
                if (entries[i].Rho > entries[i - 1].Rho && firstLexUp.Length == 0)
                    firstLexUp = "A=" + total + ":" + entries[i - 1].Word +
                        ":rho=" + entries[i - 1].Rho + " -> " + entries[i].Word +
                        ":rho=" + entries[i].Rho;
            }
            entries.Sort(delegate(Entry x, Entry y) { return x.Rho.CompareTo(y.Rho); });
            for (int i = 1; i < entries.Count; ++i)
            {
                if (entries[i].Rho == entries[i - 1].Rho)
                    throw new Exception("cylinder injectivity failed");
                if (entries[i].Rho - entries[i - 1].Rho == 2 &&
                    firstAdjacent.Length == 0)
                    firstAdjacent = "A=" + total + ":" + entries[i - 1].Word +
                        ":rho=" + entries[i - 1].Rho + ";" + entries[i].Word +
                        ":rho=" + entries[i].Rho;
            }
        }
        Console.WriteLine("firstLexDecrease=" + firstLexDown);
        Console.WriteLine("firstLexIncrease=" + firstLexUp);
        Console.WriteLine("firstAdjacentOddResidues=" + firstAdjacent);
    }

    public static void Main(string[] args)
    {
        maxDepth = args.Length > 0 ? int.Parse(args[0]) : 12;
        maxTotal = new int[maxDepth + 1];
        stats = new DepthStats[maxDepth + 1];
        for (int i = 0; i <= maxDepth; ++i) stats[i] = new DepthStats();
        BigInteger p3 = 1;
        int a = 0;
        for (int depth = 1; depth <= maxDepth; ++depth)
        {
            p3 *= 3;
            while ((BigInteger.One << (a + 1)) < p3) ++a;
            maxTotal[depth] = a;
        }
        Dfs(0, 0, 0, "");
        Console.WriteLine("depth count maxTotal minRho minWord");
        for (int depth = 1; depth <= maxDepth; ++depth)
            Console.WriteLine(depth + " " + stats[depth].Count + " " +
                maxTotal[depth] + " " + stats[depth].MinRho + " " +
                stats[depth].MinWord);
        AuditGroups();
    }
}
