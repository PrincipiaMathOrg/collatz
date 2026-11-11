using System;
using System.Collections.Generic;
using System.Numerics;

// Produces a certified common continued-fraction prefix for log_2(3).
// The logarithm intervals use only integer arithmetic and the positive series
//   log x = 2 sum_{k>=0} z^(2k+1)/(2k+1), z=(x-1)/(x+1),
// with z=1/3 for log 2 and z=1/2 for log 3.
public static class CertifiedLogRatioCF
{
    struct Frac
    {
        public BigInteger N;
        public BigInteger D;
        public Frac(BigInteger n, BigInteger d) { N = n; D = d; }
    }

    static BigInteger CeilDiv(BigInteger n, BigInteger d)
    {
        return (n + d - 1) / d;
    }

    // Returns integer L,U such that L/scale <= log(x) <= U/scale.
    // m=3 represents z=1/3 (x=2); m=2 represents z=1/2 (x=3).
    static void LogInterval(int m, int terms, BigInteger scale,
                            out BigInteger lower, out BigInteger upper)
    {
        lower = BigInteger.Zero;
        upper = BigInteger.Zero;
        BigInteger mpow = new BigInteger(m); // m^(2k+1)
        BigInteger m2 = new BigInteger(m * m);
        for (int k = 0; k < terms; ++k)
        {
            BigInteger den = new BigInteger(2 * k + 1) * mpow;
            BigInteger num = 2 * scale;
            lower += num / den;
            upper += CeilDiv(num, den);
            mpow *= m2;
        }
        // Tail from k=terms onward, bounded by replacing every denominator
        // 2k+1 by 2*terms+1 and summing the resulting geometric series.
        BigInteger tailDen = new BigInteger(2 * terms + 1) *
            BigInteger.Pow(new BigInteger(m), 2 * terms - 1) *
            new BigInteger(m * m - 1);
        upper += CeilDiv(2 * scale, tailDen);
    }

    static BigInteger Floor(Frac x) { return x.N / x.D; }

    static Frac Subtract(Frac x, BigInteger a)
    {
        return new Frac(x.N - a * x.D, x.D);
    }

    static Frac Reciprocal(Frac x)
    {
        return new Frac(x.D, x.N);
    }

    static Frac Add(Frac x, Frac y)
    {
        return new Frac(x.N * y.D + y.N * x.D, x.D * y.D);
    }

    static int Compare(Frac x, Frac y)
    {
        return (x.N * y.D).CompareTo(y.N * x.D);
    }

    static Frac FromContinuedFraction(List<BigInteger> terms)
    {
        BigInteger pm2 = BigInteger.Zero, pm1 = BigInteger.One;
        BigInteger qm2 = BigInteger.One, qm1 = BigInteger.Zero;
        for (int i = 0; i < terms.Count; ++i)
        {
            BigInteger p = terms[i] * pm1 + pm2;
            BigInteger q = terms[i] * qm1 + qm2;
            pm2 = pm1; pm1 = p; qm2 = qm1; qm1 = q;
        }
        return new Frac(pm1, qm1);
    }

    // For non-rational endpoints in practice here, the first differing
    // continued-fraction digit gives the rational of least denominator in the
    // open interval.  We print and cross-check the resulting certificate.
    static Frac SimplestBetween(Frac originalLo, Frac originalHi,
                                out List<BigInteger> description)
    {
        Frac lo = originalLo, hi = originalHi;
        description = new List<BigInteger>();
        while (true)
        {
            BigInteger a = Floor(lo), b = Floor(hi);
            if (a != b)
            {
                description.Add(a + 1);
                return FromContinuedFraction(description);
            }
            description.Add(a);
            Frac loR = Subtract(lo, a), hiR = Subtract(hi, a);
            lo = Reciprocal(hiR);
            hi = Reciprocal(loR);
        }
    }

    static void Main(string[] args)
    {
        int digits = args.Length > 0 ? int.Parse(args[0]) : 120;
        int terms = args.Length > 1 ? int.Parse(args[1]) : 500;
        int maxCf = args.Length > 2 ? int.Parse(args[2]) : 50;
        BigInteger scale = BigInteger.Pow(new BigInteger(10), digits);
        BigInteger l2L, l2U, l3L, l3U;
        LogInterval(3, terms, scale, out l2L, out l2U);
        LogInterval(2, terms, scale, out l3L, out l3U);

        Frac lo = new Frac(l3L, l2U);
        Frac hi = new Frac(l3U, l2L);
        List<BigInteger> cf = new List<BigInteger>();
        for (int j = 0; j < maxCf; ++j)
        {
            BigInteger a = Floor(lo);
            BigInteger b = Floor(hi);
            if (a != b) break;
            cf.Add(a);
            Frac oldLo = Subtract(lo, a);
            Frac oldHi = Subtract(hi, a);
            if (oldLo.N == 0 || oldHi.N == 0) break;
            lo = Reciprocal(oldHi);
            hi = Reciprocal(oldLo);
        }

        Console.WriteLine("certified CF terms: " + string.Join(",", cf.ToArray()));
        BigInteger pm2 = BigInteger.Zero, pm1 = BigInteger.One;
        BigInteger qm2 = BigInteger.One, qm1 = BigInteger.Zero;
        Console.WriteLine("j a p q side-certified");
        for (int j = 0; j < cf.Count; ++j)
        {
            BigInteger p = cf[j] * pm1 + pm2;
            BigInteger q = cf[j] * qm1 + qm2;
            // p/q is certainly above alpha if p*l2L > q*l3U,
            // and certainly below if p*l2U < q*l3L.
            string side = "?";
            if (p * l2L > q * l3U) side = "above";
            if (p * l2U < q * l3L) side = "below";
            Console.WriteLine(j + " " + cf[j] + " " + p + " " + q + " " + side);
            pm2 = pm1; pm1 = p; qm2 = qm1; qm1 = q;
        }


        // The cycle-size estimate below leads to
        //   0 < A/r-log_2(3) < 2/(3*2^71)=1/(3*2^70).
        // Find the least-denominator rational in a certified interval broad
        // enough to contain every such A/r.
        Frac epsilon = new Frac(BigInteger.One, 3 * (BigInteger.One << 70));
        Frac alphaLo = new Frac(l3L, l2U);
        Frac alphaHi = new Frac(l3U, l2L);
        Frac broadHi = Add(alphaHi, epsilon);
        List<BigInteger> simplestCf;
        Frac simplest = SimplestBetween(new Frac(l3L, l2U), broadHi, out simplestCf);
        Console.WriteLine("broad-interval simplest CF: " + string.Join(",", simplestCf.ToArray()));
        Console.WriteLine("broad-interval simplest rational: " + simplest.N + "/" + simplest.D);
        Console.WriteLine("verified inside broad interval: " +
            (Compare(alphaLo, simplest) < 0 && Compare(simplest, broadHi) < 0));
        Console.WriteLine("certified inside actual alpha-to-alpha+epsilon interval: " +
            (Compare(alphaHi, simplest) < 0 && Compare(simplest, Add(alphaLo, epsilon)) < 0));
    }
}
