using System;
using System.Collections.Generic;
using System.Numerics;

// Exhaustive search of the strict-record one-strip words forced by a
// hypothetical primitive accelerated Collatz cycle, rotated to its least state.
// This is evidence only.  All arithmetic is exact.
public static class CycleStripSearch
{
    static int r, A;
    static int[] a;
    static int[] upper;
    static BigInteger D;
    static BigInteger[] pow2;
    static long count;
    static long nontrivialGcdCount;
    static long divisibilityCount;
    static long leastRotationCount;
    static long leastRotationDivisibilityCount;
    static BigInteger maxGcd;
    static BigInteger maxQuotient;
    static int[] maxGcdWord;
    static BigInteger maxGcdCarry;
    static int[] maxQuotientWord;
    static int[] hitWord;
    static BigInteger maxLeastQuotient;
    static int[] maxLeastQuotientWord;

    static BigInteger Pow(BigInteger x, int n)
    {
        BigInteger y = BigInteger.One;
        while (n > 0)
        {
            if ((n & 1) != 0) y *= x;
            x *= x;
            n >>= 1;
        }
        return y;
    }

    static int CeilLog2Pow3(int n)
    {
        BigInteger p3 = Pow(new BigInteger(3), n);
        BigInteger p2 = BigInteger.One;
        int e = 0;
        while (p2 <= p3)
        {
            p2 <<= 1;
            ++e;
        }
        return e;
    }

    static int[] CopyWord()
    {
        int[] b = new int[r];
        Array.Copy(a, b, r);
        return b;
    }

    static string Word(int[] w)
    {
        if (w == null) return "-";
        return string.Join(",", w);
    }

    // C_{i+1}=3 C_i+2^{A_i}.
    static void Visit(BigInteger C)
    {
        ++count;
        BigInteger g = BigInteger.GreatestCommonDivisor(D, C);
        if (g > BigInteger.One) ++nontrivialGcdCount;
        if (g > maxGcd)
        {
            maxGcd = g;
            maxGcdCarry = C;
            maxGcdWord = CopyWord();
        }
        BigInteger q = C / D;
        if (q > maxQuotient)
        {
            maxQuotient = q;
            maxQuotientWord = CopyWord();
        }
        if (g == D)
        {
            ++divisibilityCount;
            if (hitWord == null) hitWord = CopyWord();
        }

        BigInteger rotated = C;
        bool least = true;
        for (int i = 0; i < r; ++i)
        {
            // Exact cyclic-carry update.  The quotient is integral as an
            // identity in the word, without assuming D divides C.
            rotated = (3 * rotated + D) >> a[i];
            if (rotated < C) least = false;
        }
        if (least)
        {
            ++leastRotationCount;
            if (g == D) ++leastRotationDivisibilityCount;
            BigInteger leastQ = C / D;
            if (leastQ > maxLeastQuotient)
            {
                maxLeastQuotient = leastQ;
                maxLeastQuotientWord = CopyWord();
            }
        }
    }

    // pos is the exponent currently being chosen; prefix is A_pos and C is
    // the carry before adding the term 2^{A_pos}.
    static void Dfs(int pos, int prefix, BigInteger C)
    {
        BigInteger nextC = 3 * C + pow2[prefix];
        if (pos == r - 1)
        {
            int last = A - prefix;
            if (last < 1) return;
            a[pos] = last;
            Visit(nextC);
            return;
        }

        int remainingAfter = r - pos - 1;
        int maxExp = A - prefix - remainingAfter;
        for (int e = 1; e <= maxExp; ++e)
        {
            int newPrefix = prefix + e;
            // At the next cut i=pos+1, strict-record means
            // 2^(A-newPrefix)>3^(r-pos-1), encoded by upper[i].
            if (newPrefix > upper[pos + 1]) break;
            a[pos] = e;
            Dfs(pos + 1, newPrefix, nextC);
        }
    }

    static void Main(string[] args)
    {
        int maxR = args.Length == 0 ? 20 : int.Parse(args[0]);
        Console.WriteLine("r A words least_rot gcd>1 hits least_hits max_gcd denom_at_max_gcd numerator_at_max_gcd max_floor_C_over_D max_least_floor max_gcd_word max_C_word max_least_word hit_word");
        for (r = 2; r <= maxR; ++r)
        {
            A = CeilLog2Pow3(r);
            BigInteger p3r = Pow(new BigInteger(3), r);
            D = (BigInteger.One << A) - p3r;
            a = new int[r];
            upper = new int[r];
            pow2 = new BigInteger[A + 1];
            for (int i = 0; i <= A; ++i) pow2[i] = BigInteger.One << i;

            // upper[i] is the greatest prefix P with 2^(A-P)>3^(r-i).
            for (int i = 1; i < r; ++i)
            {
                int p = 0;
                BigInteger rhs = Pow(new BigInteger(3), r - i);
                while (p + 1 <= A && (BigInteger.One << (A - (p + 1))) > rhs) ++p;
                upper[i] = p;
            }

            count = nontrivialGcdCount = divisibilityCount = leastRotationCount = leastRotationDivisibilityCount = 0;
            maxGcd = BigInteger.Zero;
            maxGcdCarry = BigInteger.Zero;
            maxQuotient = BigInteger.MinusOne;
            maxLeastQuotient = BigInteger.MinusOne;
            maxGcdWord = maxQuotientWord = maxLeastQuotientWord = hitWord = null;

            // Least-state rotation in a nontrivial cycle forces a_0=1.
            a[0] = 1;
            if (1 <= upper[1]) Dfs(1, 1, BigInteger.One);

            BigInteger denominator = D / maxGcd;
            Console.WriteLine(r + " " + A + " " + count + " " + leastRotationCount + " " + nontrivialGcdCount + " " +
                divisibilityCount + " " + leastRotationDivisibilityCount + " " + maxGcd + " " + denominator + " " + (maxGcdCarry / maxGcd) + " " +
                maxQuotient + " " + maxLeastQuotient + " " + Word(maxGcdWord) + " " + Word(maxQuotientWord) + " " +
                Word(maxLeastQuotientWord) + " " + Word(hitWord));
        }
    }
}
