using System;
using System.Collections.Generic;
using System.Numerics;

// Independent small-case check of the finite affine-envelope formula proved
// in inverse_fiber.md.  The formula enumerator is compared with direct
// iteration of every smaller odd start.
public static class FormulaCheck
{
    private static BigInteger Accelerated(BigInteger x)
    {
        BigInteger y = 3 * x + 1;
        while (y.IsEven) y /= 2;
        return y;
    }

    private static BigInteger Iterate(BigInteger x, int r)
    {
        for (int i = 0; i < r; i++) x = Accelerated(x);
        return x;
    }

    private static int ExponentCap(int n, int i)
    {
        BigInteger bound = 3 * (BigInteger.One << i) * n + 1;
        int floorLog = -1;
        while (bound > 0) { bound >>= 1; floorLog++; }
        return floorLog;
    }

    private static void Enumerate(
        int n, int r, int i, BigInteger endpoint,
        BigInteger powerTwo, BigInteger carry, ref BigInteger best)
    {
        if (i == r)
        {
            BigInteger modulus = BigInteger.Pow(3, r);
            BigInteger numerator = powerTwo * endpoint - carry;
            if (numerator > 0 && numerator % modulus == 0)
            {
                BigInteger z = numerator / modulus;
                if (z <= n && z < best) best = z;
            }
            return;
        }

        int cap = ExponentCap(n, i);
        for (int a = 1; a <= cap; a++)
        {
            Enumerate(n, r, i + 1, endpoint,
                powerTwo << a,
                3 * carry + powerTwo,
                ref best);
        }
    }

    private static BigInteger Formula(int n, int r)
    {
        BigInteger endpoint = Iterate(n, r);
        BigInteger best = n;
        Enumerate(n, r, 0, endpoint, 1, 0, ref best);
        return best;
    }

    private static BigInteger Direct(int n, int r)
    {
        BigInteger endpoint = Iterate(n, r);
        for (int z = 1; z <= n; z += 2)
            if (Iterate(z, r) == endpoint) return z;
        throw new InvalidOperationException();
    }

    public static void Main(string[] args)
    {
        int limit = args.Length > 0 ? int.Parse(args[0]) : 99;
        int depth = args.Length > 1 ? int.Parse(args[1]) : 4;
        long cases = 0;
        for (int n = 1; n <= limit; n += 2)
        {
            for (int r = 0; r <= depth; r++)
            {
                BigInteger formula = Formula(n, r);
                BigInteger direct = Direct(n, r);
                if (formula != direct)
                    throw new Exception("Mismatch n=" + n + " r=" + r +
                        " formula=" + formula + " direct=" + direct);
                cases++;
            }
        }
        Console.WriteLine("formula_cases_checked=" + cases);
        Console.WriteLine("formula_crosscheck_passed=True");
    }
}
