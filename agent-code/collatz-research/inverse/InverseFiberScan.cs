using System;
using System.Collections.Generic;

// Exact finite scan of stationary inverse-fiber minima.  For every odd
// n <= limit it finds the first r for which a smaller odd z has
// U^r(z)=U^r(n).  Since every possible z<n is included, each reported finite
// statement is exhaustive for that n.
public static class InverseFiberScan
{
    private static ulong Accelerated(ulong x)
    {
        checked
        {
            ulong y = 3UL * x + 1UL;
            while ((y & 1UL) == 0UL) y >>= 1;
            return y;
        }
    }

    public static void Main(string[] args)
    {
        int limit = args.Length > 0 ? int.Parse(args[0]) : 1000000;
        int maxDepth = args.Length > 1 ? int.Parse(args[1]) : 200;
        int count = (limit + 1) / 2;
        ulong[] values = new ulong[count];
        bool[] alive = new bool[count];
        int aliveCount = count;
        for (int i = 0; i < count; i++)
        {
            values[i] = (ulong)(2 * i + 1);
            alive[i] = true;
        }

        Console.WriteLine("depth,stationary_count,largest_stationary,largest_newly_extinct");
        Console.WriteLine("0,{0},{1},0", aliveCount, 2 * count - 1);
        for (int depth = 1; depth <= maxDepth && aliveCount > 1; depth++)
        {
            var first = new Dictionary<ulong, int>(count);
            for (int i = 0; i < count; i++)
            {
                values[i] = Accelerated(values[i]);
                int old;
                if (!first.TryGetValue(values[i], out old)) first.Add(values[i], i);
            }

            int largestAlive = 1;
            int largestExtinct = 0;
            for (int i = 1; i < count; i++)
            {
                if (!alive[i]) continue;
                if (first[values[i]] < i)
                {
                    alive[i] = false;
                    aliveCount--;
                    largestExtinct = 2 * i + 1;
                }
                else largestAlive = 2 * i + 1;
            }
            Console.WriteLine("{0},{1},{2},{3}", depth, aliveCount, largestAlive, largestExtinct);
        }

        Console.Write("survivors");
        for (int i = 0; i < count; i++) if (alive[i]) Console.Write("," + (2 * i + 1));
        Console.WriteLine();
    }
}
