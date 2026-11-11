using System;
using System.Numerics;

// Exact finite base for the front-loaded reference word 1^s 0^(k-s).
// The symbolic tail uses the audited logarithmic-form bound P7.1.
public static class FcdFrontLoadedBaseCertificate
{
    public static void Main(string[] args)
    {
        int maximum = args.Length == 0 ? 127 : int.Parse(args[0]);
        BigInteger P = 1;
        BigInteger M = 1;
        int k = 0;
        BigInteger leastExcess = 0;
        int leastWeight = 0;
        for (int s = 1; s <= maximum; ++s)
        {
            P *= 3;
            while (M <= P)
            {
                M <<= 1;
                ++k;
            }
            int e = k - s;
            BigInteger D = M - P;
            BigInteger terminalScale = BigInteger.One << e;
            BigInteger excess = D - (terminalScale - 1);
            if (s == 1)
            {
                if (D != terminalScale - 1)
                    throw new Exception("boundary word 10 did not give equality");
                continue;
            }
            if (excess <= 0)
                throw new Exception("front-loaded strictness failed at s=" + s);
            if (leastWeight == 0 || excess < leastExcess)
            {
                leastExcess = excess;
                leastWeight = s;
            }
        }
        Console.WriteLine("checked=2.." + maximum +
            ":boundaryEquality=s1:leastExcess=" + leastExcess +
            ":leastWeight=" + leastWeight);
    }
}
