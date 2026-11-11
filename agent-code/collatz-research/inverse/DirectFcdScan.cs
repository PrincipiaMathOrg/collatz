using System;
using System.Numerics;

// Direct falsifier for First-Crossing Descent.  This scans ordinary starting
// integers, so it reaches much longer coefficient-crossing words than a full
// enumeration of all admissible words.  Absence of a hit is finite evidence.
public static class DirectFcdScan
{
    static void Main(string[] args)
    {
        long limit = args.Length > 0 ? long.Parse(args[0]) : 1000000L;
        int maxSteps = args.Length > 1 ? int.Parse(args[1]) : 10000;
        long tested = 0, violations = 0, noCross = 0;
        int longest = 0;
        long longestSeed = 0;
        BigInteger smallestGap = BigInteger.Zero;
        long smallestGapSeed = 0;
        int smallestGapLength = 0;

        for (long start = 2; start <= limit; ++start)
        {
            BigInteger x = new BigInteger(start);
            BigInteger p2 = BigInteger.One;
            BigInteger p3 = BigInteger.One;
            bool crossed = false;
            for (int k = 1; k <= maxSteps; ++k)
            {
                bool odd = !x.IsEven;
                if (odd)
                {
                    x = (3 * x + 1) >> 1;
                    p3 *= 3;
                }
                else
                {
                    x >>= 1;
                }
                p2 <<= 1;
                if (p3 < p2)
                {
                    crossed = true;
                    ++tested;
                    if (k > longest) { longest = k; longestSeed = start; }
                    BigInteger gap = new BigInteger(start) - x;
                    if (smallestGapSeed == 0 || gap < smallestGap)
                    {
                        smallestGap = gap;
                        smallestGapSeed = start;
                        smallestGapLength = k;
                    }
                    if (x >= start)
                    {
                        ++violations;
                        BigInteger y = new BigInteger(start);
                        string word = "";
                        for (int j = 0; j < k; ++j)
                        {
                            if (y.IsEven) { word += "0"; y >>= 1; }
                            else { word += "1"; y = (3 * y + 1) >> 1; }
                        }
                        Console.WriteLine("VIOLATION start=" + start + " k=" + k +
                            " endpoint=" + x + " gap=" + gap + " word=" + word);
                        return;
                    }
                    break;
                }
            }
            if (!crossed) ++noCross;
        }

        Console.WriteLine("limit=" + limit + " tested=" + tested + " noCross=" + noCross +
            " violations=" + violations + " longestK=" + longest + " longestSeed=" + longestSeed +
            " minGap=" + smallestGap + " minGapSeed=" + smallestGapSeed +
            " minGapK=" + smallestGapLength);
    }
}
