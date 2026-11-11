using System;
using System.Collections.Generic;
using System.Numerics;

// Exhaustive positive-seed falsification scan for the mechanical-ballot
// terminal cylinder inequality.  UInt64 arithmetic is guarded exactly.
public static class StrictTerminalSeedScan
{
    private static int BitLengthPow3(int r)
    {
        BigInteger x = BigInteger.Pow(new BigInteger(3), r);
        int n = 0;
        while (x > 0) { x >>= 1; ++n; }
        return n;
    }

    private static int V2(ulong x)
    {
        int a = 0;
        while ((x & 1UL) == 0UL) { x >>= 1; ++a; }
        return a;
    }

    public static int Main(string[] args)
    {
        int maxR = args.Length > 0 ? int.Parse(args[0]) : 40;
        if (maxR < 2 || maxR > 100) throw new ArgumentOutOfRangeException("maxR");
        int[] n = new int[maxR + 1];
        int maxHeight = 0;
        for (int r = 2; r <= maxR; ++r)
        {
            n[r] = BitLengthPow3(r);
            int height = n[r] - r - 1;
            if (height > maxHeight) maxHeight = height;
        }
        int scanHeight = args.Length > 1 ? int.Parse(args[1]) : maxHeight;
        if (scanHeight < 1 || scanHeight > 30) throw new ArgumentOutOfRangeException("scanHeight");
        ulong limit = 1UL << Math.Min(maxHeight, scanHeight);
        ulong seeds = 0;
        ulong candidateRows = 0;

        for (ulong seed = 1; seed <= limit; seed += 2)
        {
            ++seeds;
            ulong x = seed;
            int total = 0;
            var prefix = new List<int>(maxR + 1) { 0 };
            var word = new List<int>(maxR);
            for (int r = 1; r <= maxR; ++r)
            {
                if (x > (UInt64.MaxValue - 1UL) / 3UL)
                    throw new OverflowException("guarded orbit overflow");
                ulong y = 3UL * x + 1UL;
                int a = V2(y);
                x = y >> a;
                total += a;
                prefix.Add(total);
                word.Add(a);
                if (r < 2 || total != n[r]) continue;
                int bLast = ((r - 1) * n[r]) / r;
                int h = bLast - prefix[r - 1];
                if (h < 1 || a != h + 2 || (h < 63 && seed > (1UL << h))) continue;
                bool ballot = true;
                for (int i = 0; i < r; ++i)
                {
                    if (prefix[i] > (i * n[r]) / r) { ballot = false; break; }
                }
                if (!ballot) continue;
                ++candidateRows;
                Console.WriteLine("COUNTEREXAMPLE r={0} N={1} seed={2} endpoint={3} h={4} word={5}",
                    r, n[r], seed, x, h, String.Join(",", word));
                return 1;
            }
        }
        Console.WriteLine("PASS maxR={0} maxHeight={1} scanHeight={2} oddSeeds={3} candidateRows={4}",
            maxR, maxHeight, scanHeight, seeds, candidateRows);
        return 0;
    }
}
