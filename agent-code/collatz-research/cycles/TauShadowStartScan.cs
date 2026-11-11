using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

// Fast falsification scan over starts of the negative shortcut map.
// The floating coefficient test is used only to find candidates.  Any
// reported record must subsequently be checked by the exact JS certificate.
public static class TauShadowStartScan
{
    sealed class Record
    {
        public ulong Start, End, Gap;
        public int K, S;
        public string Word = "";
    }

    static readonly object Gate = new object();
    static Record bestRatio = null;
    static long bestThirdExcess = long.MaxValue;
    static Record bestThird = null;
    static Record firstFailure = null;
    static Record firstEarlyDescent = null;
    static int[] crossingLength;
    static long crossings, cycleExits, overflows, timeouts, earlyDescents;

    static bool BetterRatio(Record x, Record y)
    {
        if (y == null) return true;
        return (decimal)x.Gap * y.S < (decimal)y.Gap * x.S;
    }

    static bool ReachesCycle(ulong start, int maxSteps)
    {
        var seen = new HashSet<ulong>();
        ulong m = start;
        for (int k = 0; k <= maxSteps; ++k)
        {
            if (!seen.Add(m)) return true;
            if ((m & 1UL) != 0)
            {
                if (m > (ulong.MaxValue - 1UL) / 3UL) return false;
                m = (3UL * m - 1UL) >> 1;
            }
            else m >>= 1;
        }
        return false;
    }

    static Record Cross(ulong start, int maxSteps, out int status)
    {
        ulong m = start;
        int s = 0;
        var word = new StringBuilder();
        for (int k = 1; k <= maxSteps; ++k)
        {
            if ((m & 1UL) != 0)
            {
                if (m > (ulong.MaxValue - 1UL) / 3UL)
                { status = 3; return null; }
                word.Append('1');
                m = (3UL * m - 1UL) >> 1;
                ++s;
            }
            else
            {
                word.Append('0');
                m >>= 1;
            }
            if (k >= crossingLength[s])
            {
                if (m >= start) throw new Exception("floating crossing inconsistency");
                status = 1;
                return new Record { Start = start, End = m, Gap = start - m,
                    K = k, S = s, Word = word.ToString() };
            }
            if (m < start)
            {
                status = 5;
                return new Record { Start = start, End = m, Gap = start - m,
                    K = -k, S = s, Word = word.ToString() };
            }
            // The only small noncrossing cycles matter disproportionately in
            // a sequential start scan.  Stop as soon as either is entered.
            if (m == 1UL || m == 5UL) { status = 2; return null; }
        }
        status = ReachesCycle(start, maxSteps) ? 2 : 4;
        return null;
    }

    static void Main(string[] args)
    {
        long maxStart = args.Length > 0 ? long.Parse(args[0]) : 100000000;
        int maxSteps = args.Length > 1 ? int.Parse(args[1]) : 10000;
        long chunk = args.Length > 2 ? long.Parse(args[2]) : 100000;

        crossingLength = new int[maxSteps + 1];
        BigInteger p3 = BigInteger.One, p2 = BigInteger.One;
        int exponent2 = 0;
        for (int ones = 0; ones <= maxSteps; ++ones)
        {
            if (ones > 0) p3 *= 3;
            while (p2 <= p3) { p2 <<= 1; ++exponent2; }
            crossingLength[ones] = exponent2;
        }

        Parallel.ForEach(Partitioner.Create(3L, maxStart + 1L, chunk), range =>
        {
            Record localRatio = null, localThird = null, localFailure = null;
            Record localEarly = null;
            long localThirdExcess = long.MaxValue;
            long localCrossings = 0, localCycles = 0, localOverflows = 0,
                localTimeouts = 0, localEarlyCount = 0;
            long first = (range.Item1 & 1L) == 0 ? range.Item1 + 1 : range.Item1;
            for (long raw = first; raw < range.Item2; raw += 2)
            {
                int status;
                Record x = Cross((ulong)raw, maxSteps, out status);
                if (status == 1) ++localCrossings;
                else if (status == 2) ++localCycles;
                else if (status == 3) ++localOverflows;
                else if (status == 4) ++localTimeouts;
                else if (status == 5) ++localEarlyCount;
                if (x == null) continue;
                if (x.K < 0)
                {
                    if (localEarly == null) localEarly = x;
                    continue;
                }
                if (x.S <= 1) continue;
                if (BetterRatio(x, localRatio)) localRatio = x;
                if (x.Gap <= (ulong)(long.MaxValue / 3L))
                {
                    long excess = 3L * (long)x.Gap - x.S;
                    if (excess < localThirdExcess)
                    { localThirdExcess = excess; localThird = x; }
                    if (excess < 0 && localFailure == null) localFailure = x;
                }
            }
            lock (Gate)
            {
                if (BetterRatio(localRatio, bestRatio)) bestRatio = localRatio;
                if (localThirdExcess < bestThirdExcess)
                { bestThirdExcess = localThirdExcess; bestThird = localThird; }
                if (firstFailure == null && localFailure != null) firstFailure = localFailure;
                if (firstEarlyDescent == null && localEarly != null) firstEarlyDescent = localEarly;
                crossings += localCrossings;
                cycleExits += localCycles;
                overflows += localOverflows;
                timeouts += localTimeouts;
                earlyDescents += localEarlyCount;
            }
        });

        Action<string, Record> Print = (label, x) =>
        {
            if (x == null) { Console.WriteLine(label + "=none"); return; }
            Console.WriteLine(label + ":start=" + x.Start + ":end=" + x.End +
                ":gap=" + x.Gap + ":k=" + x.K + ":s=" + x.S +
                ":thirdExcess=" + (3L * (long)x.Gap - x.S) + ":word=" + x.Word);
        };
        Console.WriteLine("maxStart=" + maxStart);
        Print("bestRatio", bestRatio);
        Print("bestThirdExcess", bestThird);
        Print("firstThirdFailure", firstFailure);
        Print("firstEarlyDescentBeforeCoefficientCrossing", firstEarlyDescent);
        Console.WriteLine("crossings=" + crossings + ":cycleExits=" + cycleExits +
            ":overflows=" + overflows + ":timeouts=" + timeouts +
            ":earlyDescents=" + earlyDescents);
    }
}
