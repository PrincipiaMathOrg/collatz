using System;
using System.Collections.Generic;
using System.Numerics;

// Searches for a counterexample to monotonicity of ancestor size in the
// total exponent. The words have fixed depth and fixed endpoint.
public static class TotalExponentOrderSearch
{
    private sealed class Hit
    {
        public int A;
        public BigInteger Z;
        public string Word;
    }

    private static void Enumerate(
        int r, int i, int maxLetter, BigInteger endpoint,
        BigInteger powerTwo, BigInteger carry, int totalA, int[] word,
        List<Hit> hits)
    {
        if (i == r)
        {
            BigInteger modulus = BigInteger.Pow(3, r);
            BigInteger numerator = powerTwo * endpoint - carry;
            if (numerator > 0 && numerator % modulus == 0)
            {
                hits.Add(new Hit {
                    A = totalA,
                    Z = numerator / modulus,
                    Word = string.Join(".", word)
                });
            }
            return;
        }
        for (int a = 1; a <= maxLetter; a++)
        {
            word[i] = a;
            Enumerate(r, i + 1, maxLetter, endpoint,
                powerTwo << a, 3 * carry + powerTwo,
                totalA + a, word, hits);
        }
    }

    public static void Main(string[] args)
    {
        int endpointLimit = args.Length > 0 ? int.Parse(args[0]) : 199;
        int maxDepth = args.Length > 1 ? int.Parse(args[1]) : 5;
        int maxLetter = args.Length > 2 ? int.Parse(args[2]) : 8;
        for (int x = 1; x <= endpointLimit; x += 2)
        {
            if (x % 3 == 0) continue;
            for (int r = 1; r <= maxDepth; r++)
            {
                var hits = new List<Hit>();
                Enumerate(r, 0, maxLetter, x, 1, 0, 0, new int[r], hits);
                foreach (Hit lowA in hits)
                foreach (Hit highA in hits)
                {
                    if (highA.A > lowA.A && highA.Z < lowA.Z)
                    {
                        Console.WriteLine("endpoint=" + x + " r=" + r +
                            " lowA=" + lowA.A + " lowZ=" + lowA.Z +
                            " lowWord=" + lowA.Word +
                            " highA=" + highA.A + " highZ=" + highA.Z +
                            " highWord=" + highA.Word);
                        return;
                    }
                }
            }
        }
        Console.WriteLine("no_counterexample_in_box=True");
    }
}
