using System;
using System.Security.Cryptography;
using System.Text;

// Exact finite certificate for the stationary inverse-fiber addendum.
// All orbit arithmetic is checked UInt64 arithmetic.  The scan compares the
// seed with every smaller positive odd integer, so exposure through the
// reported depth is exhaustive, not a bounded inverse-word search.
public static class StationaryExposureCertificate
{
    private static ulong Step(ulong x, out int valuation)
    {
        checked
        {
            ulong y = 3UL * x + 1UL;
            valuation = 0;
            while ((y & 1UL) == 0UL)
            {
                y >>= 1;
                valuation++;
            }
            return y;
        }
    }

    private static int LeastPeriod(int[] word, int length)
    {
        for (int p = 1; p <= length; p++)
        {
            bool valid = true;
            for (int i = p; i < length; i++)
            {
                if (word[i] != word[i - p])
                {
                    valid = false;
                    break;
                }
            }
            if (valid) return p;
        }
        return length;
    }

    // Returns the longest terminal segment which contains at least two full
    // copies of a period.  A return value of zero means that the word has no
    // square suffix.
    private static int LongestPeriodicSuffix(int[] word, int length, out int period)
    {
        int bestLength = 0;
        period = 0;
        for (int p = 1; 2 * p <= length; p++)
        {
            int suffixLength = p;
            while (suffixLength < length &&
                   word[length - suffixLength - 1] ==
                   word[length - suffixLength - 1 + p])
            {
                suffixLength++;
            }
            if (suffixLength >= 2 * p && suffixLength > bestLength)
            {
                bestLength = suffixLength;
                period = p;
            }
        }
        return bestLength;
    }

    private static string WordString(int[] word, int length)
    {
        var builder = new StringBuilder();
        for (int i = 0; i < length; i++)
        {
            if (i != 0) builder.Append(',');
            builder.Append(word[i]);
        }
        return builder.ToString();
    }

    private static string Sha256(string value)
    {
        using (SHA256 hash = SHA256.Create())
        {
            byte[] digest = hash.ComputeHash(Encoding.ASCII.GetBytes(value));
            var builder = new StringBuilder(64);
            foreach (byte b in digest) builder.Append(b.ToString("x2"));
            return builder.ToString();
        }
    }

    public static void Main(string[] args)
    {
        ulong seed = args.Length > 0 ? ulong.Parse(args[0]) : 837799UL;
        int maxDepth = args.Length > 1 ? int.Parse(args[1]) : 195;
        if ((seed & 1UL) == 0UL || seed < 3UL)
            throw new ArgumentException("seed must be an odd integer at least 3");

        var endpoint = new ulong[maxDepth + 1];
        var valuation = new int[maxDepth];
        endpoint[0] = seed;
        ulong maximumState = seed;
        for (int d = 0; d < maxDepth; d++)
        {
            endpoint[d + 1] = Step(endpoint[d], out valuation[d]);
            if (endpoint[d + 1] > maximumState) maximumState = endpoint[d + 1];
        }

        int firstLoss = int.MaxValue;
        ulong leastCollider = 0UL;
        ulong testedSeeds = 0UL;
        for (ulong z = 1UL; z < seed; z += 2UL)
        {
            testedSeeds++;
            ulong x = z;
            for (int d = 1; d <= maxDepth; d++)
            {
                int ignored;
                x = Step(x, out ignored);
                if (x > maximumState) maximumState = x;
                if (x == endpoint[d])
                {
                    if (d < firstLoss || (d == firstLoss && z < leastCollider))
                    {
                        firstLoss = d;
                        leastCollider = z;
                    }
                    // Equality persists forever, so this seed cannot have a
                    // later first collision.
                    break;
                }
            }
        }

        int exposedThrough = firstLoss == int.MaxValue ? maxDepth : firstLoss - 1;
        int suffixPeriod;
        int periodicSuffix = LongestPeriodicSuffix(
            valuation, exposedThrough, out suffixPeriod);
        string exposedWord = WordString(valuation, exposedThrough);

        Console.WriteLine("seed=" + seed);
        Console.WriteLine("tested_smaller_odd_seeds=" + testedSeeds);
        Console.WriteLine("max_depth=" + maxDepth);
        Console.WriteLine("first_exposure_loss=" +
            (firstLoss == int.MaxValue ? "none" : firstLoss.ToString()));
        Console.WriteLine("exposed_through=" + exposedThrough);
        Console.WriteLine("least_collider_at_first_loss=" + leastCollider);
        Console.WriteLine("endpoint_at_exposed_depth=" + endpoint[exposedThrough]);
        if (firstLoss != int.MaxValue)
            Console.WriteLine("endpoint_at_first_loss=" + endpoint[firstLoss]);
        Console.WriteLine("least_period_of_exposed_word=" +
            LeastPeriod(valuation, exposedThrough));
        Console.WriteLine("longest_periodic_suffix=" + periodicSuffix);
        Console.WriteLine("period_of_that_suffix=" + suffixPeriod);
        Console.WriteLine("exposed_word_sha256=" + Sha256(exposedWord));
        Console.WriteLine("maximum_state_checked=" + maximumState);
        Console.WriteLine("checked_uint64_overflow=False");
    }
}
