using System;
using System.Numerics;

// Finds stationary finite-depth examples whose exposed actual word does not
// have the least feasible dyadic slope. Such examples show that a slope gap
// alone does not force descent at the left edge of an endpoint progression.
public static class SlopeGapSearch
{
    private static int V2(BigInteger x)
    {
        int a = 0;
        while (x.IsEven) { x /= 2; a++; }
        return a;
    }

    private static BigInteger Accelerated(BigInteger x)
    {
        BigInteger y = 3 * x + 1;
        return y >> V2(y);
    }

    private static BigInteger EndpointAndExponent(int n, int r, out int totalA)
    {
        BigInteger x = n;
        totalA = 0;
        for (int i = 0; i < r; i++)
        {
            BigInteger y = 3 * x + 1;
            int a = V2(y);
            totalA += a;
            x = y >> a;
        }
        return x;
    }

    private static bool IsStationary(int n, int r, BigInteger endpoint)
    {
        for (int z = 1; z < n; z += 2)
        {
            BigInteger x = z;
            for (int i = 0; i < r; i++) x = Accelerated(x);
            if (x == endpoint) return false;
        }
        return true;
    }

    private static bool FindWord(
        int r, int index, int remainingA, BigInteger endpoint,
        BigInteger powerTwo, BigInteger carry, int[] word,
        out BigInteger score)
    {
        if (index == r)
        {
            BigInteger modulus = BigInteger.Pow(3, r);
            BigInteger numerator = powerTwo * endpoint - carry;
            if (remainingA == 0 && numerator > 0 && numerator % modulus == 0)
            {
                score = numerator / modulus;
                return true;
            }
            score = 0;
            return false;
        }
        int remainingLetters = r - index - 1;
        for (int a = 1; a <= remainingA - remainingLetters; a++)
        {
            word[index] = a;
            if (FindWord(r, index + 1, remainingA - a, endpoint,
                powerTwo << a, 3 * carry + powerTwo, word, out score))
                return true;
        }
        score = 0;
        return false;
    }

    public static void Main(string[] args)
    {
        int limit = args.Length > 0 ? int.Parse(args[0]) : 10000;
        int maxDepth = args.Length > 1 ? int.Parse(args[1]) : 8;
        for (int n = 3; n <= limit; n += 2)
        {
            for (int r = 1; r <= maxDepth; r++)
            {
                int actualA;
                BigInteger endpoint = EndpointAndExponent(n, r, out actualA);
                if (!IsStationary(n, r, endpoint)) continue;

                BigInteger modulus = 2 * BigInteger.Pow(3, r);
                BigInteger t = (endpoint - 1) / modulus;
                BigInteger baseEndpoint = endpoint - modulus * t;
                for (int aTotal = r; aTotal < actualA; aTotal++)
                {
                    int[] word = new int[r];
                    BigInteger baseScore;
                    if (FindWord(r, 0, aTotal, baseEndpoint, 1, 0, word, out baseScore))
                    {
                        Console.WriteLine("n=" + n + " r=" + r +
                            " endpoint=" + endpoint + " t=" + t +
                            " actualA=" + actualA + " lowerA=" + aTotal +
                            " lowerBaseScore=" + baseScore +
                            " lowerWord=" + string.Join(".", word));
                        return;
                    }
                }
            }
        }
        Console.WriteLine("no_stationary_slope_gap_found=True");
    }
}
