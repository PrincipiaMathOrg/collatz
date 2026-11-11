using System;
using System.Collections.Generic;
using System.Numerics;
using System.Security.Cryptography;
using System.Text;

// Exact branch-and-bound search for a small reduced residue tau.
//
// For fixed s and k=ceil(s log_2 3), tau=t is equivalent to
//
//   C = 3^s t + n(2^k-3^s)
//
// for an integer n.  There are only finitely many such target carries in
// the exact global carry interval.  At every prefix of the increasing one
// positions, the program computes the exact least and greatest carry of a
// completion.  A branch is discarded when that interval contains no target.
// Every leaf and every reported margin uses BigInteger arithmetic.
public static class FcdLowTauTargetSearch
{
    sealed class Target
    {
        public BigInteger C;
        public int Tau;
        public BigInteger N;
    }

    static int s, k, maxTau;
    static BigInteger P, M, D;
    static int[] maxPosition, latestPosition, chosen;
    static BigInteger[,] weight, minCompletion;
    static bool[,] minFeasible;
    static BigInteger[] maxCompletion;
    static List<Target> targets = new List<Target>();
    static ulong[] nodes, pruned;
    static long hits, nonpositiveMargins;
    static string firstHit = "", firstNonpositive = "";

    static BigInteger FloorDiv(BigInteger a, BigInteger b)
    {
        BigInteger rem;
        BigInteger q = BigInteger.DivRem(a, b, out rem);
        if (rem.Sign < 0) --q;
        return q;
    }

    static BigInteger CeilDiv(BigInteger a, BigInteger b)
    {
        return -FloorDiv(-a, b);
    }

    static int LowerBound(BigInteger value, int lo, int hi)
    {
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (targets[mid].C < value) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }

    static int UpperBound(BigInteger value, int lo, int hi)
    {
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (targets[mid].C <= value) lo = mid + 1;
            else hi = mid;
        }
        return lo;
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

    static string Word()
    {
        char[] word = new char[k];
        for (int j = 0; j < k; ++j) word[j] = '0';
        for (int i = 0; i < s; ++i) word[chosen[i]] = '1';
        return new string(word);
    }

    static void Record(Target target, BigInteger carry)
    {
        if (carry != target.C) throw new Exception("target mismatch");
        BigInteger margin = M * target.Tau - carry;
        BigInteger signedStart = target.Tau - target.N;
        if (margin != D * signedStart) throw new Exception("margin mismatch");
        string word = Word();

        // Independent reconstruction of the carry and every ballot bound.
        BigInteger checkC = 0;
        for (int i = 0; i < s; ++i)
        {
            if (chosen[i] > maxPosition[i]) throw new Exception("ballot mismatch");
            if (i > 0 && chosen[i] <= chosen[i - 1])
                throw new Exception("position order mismatch");
            checkC += weight[i, chosen[i]];
        }
        if (checkC != carry) throw new Exception("carry reconstruction mismatch");

        string record = "s=" + s + ";k=" + k + ";tau=" + target.Tau +
            ";n=" + target.N + ";C=" + carry + ";margin=" + margin +
            ";word=" + word;
        string report = record + ";sha256=" + Sha256(record);
        ++hits;
        if (firstHit.Length == 0) firstHit = report;
        if (margin <= 0)
        {
            ++nonpositiveMargins;
            if (firstNonpositive.Length == 0) firstNonpositive = report;
        }
    }

    static void Search(int rank, int nextPosition, BigInteger partial,
        int targetLo, int targetHi)
    {
        ++nodes[rank];
        if (rank == s)
        {
            int at = LowerBound(partial, targetLo, targetHi);
            while (at < targetHi && targets[at].C == partial)
            {
                Record(targets[at], partial);
                ++at;
            }
            return;
        }
        if (nextPosition >= k || !minFeasible[rank, nextPosition] ||
            latestPosition[rank] < nextPosition)
        {
            ++pruned[rank];
            return;
        }

        BigInteger least = partial + minCompletion[rank, nextPosition];
        BigInteger greatest = partial + maxCompletion[rank];
        int lo = LowerBound(least, targetLo, targetHi);
        int hi = UpperBound(greatest, lo, targetHi);
        if (lo == hi)
        {
            ++pruned[rank];
            return;
        }

        int upper = latestPosition[rank];
        for (int position = nextPosition; position <= upper; ++position)
        {
            chosen[rank] = position;
            Search(rank + 1, position + 1, partial + weight[rank, position],
                lo, hi);
        }
    }

    static void Setup(int requestedS, int requestedMaxTau)
    {
        s = requestedS;
        P = BigInteger.Pow(3, s);
        k = 0;
        while ((BigInteger.One << k) <= P) ++k;
        M = BigInteger.One << k;
        D = M - P;
        maxTau = requestedMaxTau >= 0 ? requestedMaxTau : (s - 1) / 3;
        maxPosition = new int[s];
        latestPosition = new int[s];
        chosen = new int[s];
        nodes = new ulong[s + 1];
        pruned = new ulong[s + 1];

        BigInteger power3 = 1;
        int currentMax = 0;
        for (int i = 0; i < s; ++i)
        {
            while ((BigInteger.One << (currentMax + 1)) <= power3)
                ++currentMax;
            maxPosition[i] = currentMax;
            power3 *= 3;
        }

        weight = new BigInteger[s, k];
        BigInteger[] tail3 = new BigInteger[s];
        tail3[s - 1] = 1;
        for (int i = s - 2; i >= 0; --i) tail3[i] = 3 * tail3[i + 1];
        for (int i = 0; i < s; ++i)
            for (int position = 0; position < k; ++position)
                weight[i, position] = tail3[i] * (BigInteger.One << position);

        latestPosition[s - 1] = maxPosition[s - 1];
        for (int i = s - 2; i >= 0; --i)
            latestPosition[i] = Math.Min(maxPosition[i], latestPosition[i + 1] - 1);

        maxCompletion = new BigInteger[s + 1];
        maxCompletion[s] = 0;
        for (int i = s - 1; i >= 0; --i)
            maxCompletion[i] = maxCompletion[i + 1] + weight[i, latestPosition[i]];

        minCompletion = new BigInteger[s + 1, k + 1];
        minFeasible = new bool[s + 1, k + 1];
        for (int next = 0; next <= k; ++next) minFeasible[s, next] = true;
        for (int rank = 0; rank < s; ++rank)
        {
            for (int next = 0; next < k; ++next)
            {
                BigInteger sum = 0;
                bool feasible = true;
                for (int i = rank; i < s; ++i)
                {
                    int position = next + i - rank;
                    if (position >= k || position > maxPosition[i])
                    {
                        feasible = false;
                        break;
                    }
                    sum += weight[i, position];
                }
                minFeasible[rank, next] = feasible;
                if (feasible) minCompletion[rank, next] = sum;
            }
        }

        BigInteger globalMin = weight[0, 0] + minCompletion[1, 1];
        BigInteger globalMax = weight[0, 0] + maxCompletion[1];
        for (int t = 0; t <= maxTau; ++t)
        {
            BigInteger baseCarry = P * t;
            BigInteger nMin = CeilDiv(globalMin - baseCarry, D);
            BigInteger nMax = FloorDiv(globalMax - baseCarry, D);
            for (BigInteger n = nMin; n <= nMax; ++n)
            {
                Target target = new Target();
                target.Tau = t;
                target.N = n;
                target.C = baseCarry + n * D;
                targets.Add(target);
            }
        }
        targets.Sort(delegate(Target x, Target y)
        {
            int compare = x.C.CompareTo(y.C);
            return compare != 0 ? compare : x.Tau.CompareTo(y.Tau);
        });
    }

    public static void Main(string[] args)
    {
        int requestedS = args.Length > 0 ? int.Parse(args[0]) : 40;
        int requestedMaxTau = args.Length > 1 ? int.Parse(args[1]) : -1;
        Setup(requestedS, requestedMaxTau);
        Console.WriteLine("s=" + s + " k=" + k + " D=" + D +
            " maxTau=" + maxTau + " exactCarryTargets=" + targets.Count);
        chosen[0] = 0;
        Search(1, 1, weight[0, 0], 0, targets.Count);
        for (int rank = 1; rank <= s; ++rank)
            if (nodes[rank] != 0)
                Console.WriteLine("rank=" + rank + " nodes=" + nodes[rank] +
                    " pruned=" + pruned[rank]);
        Console.WriteLine("hits=" + hits + " nonpositiveMargins=" +
            nonpositiveMargins);
        Console.WriteLine("firstHit=" + firstHit);
        Console.WriteLine("firstNonpositive=" + firstNonpositive);
        if (hits == 0 && maxTau == (s - 1) / 3)
            Console.WriteLine("CERTIFIED: every word of weight s=" + s +
                " satisfies 3*tau>=s, hence M*tau-C>0.");
        else if (nonpositiveMargins == 0)
            Console.WriteLine("Every low-tau hit found has positive exact FCD margin.");
    }
}
