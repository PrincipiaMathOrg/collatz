using System;
using System.Collections.Generic;
using System.Numerics;

// Tests whether the abstract symmetric-CRT branch coloring has a 1,1,1,0
// commuting square for move pairs which really occur in the ballot-word
// distributive lattice.  The carry C is varied over all odd values in the
// fundamental interval, so a hit is a no-go for a curl-only proof, not an
// FCD counterexample.
public static class FcdCommutingSquareAudit
{
    struct Data
    {
        public int K, S;
        public BigInteger M, P, D, C;
    }

    static BigInteger Mod(BigInteger x, BigInteger m)
    {
        x %= m;
        return x.Sign < 0 ? x + m : x;
    }

    static BigInteger Inv(BigInteger a, BigInteger m)
    {
        BigInteger t = 0, nextT = 1, r = m, nextR = Mod(a, m);
        while (nextR != 0)
        {
            BigInteger q = r / nextR;
            BigInteger z = t - q * nextT;
            t = nextT;
            nextT = z;
            z = r - q * nextR;
            r = nextR;
            nextR = z;
        }
        if (r != 1) throw new Exception("inverse does not exist");
        return Mod(t, m);
    }

    static Data GetData(string word)
    {
        Data x = new Data();
        x.K = word.Length;
        BigInteger carry = 0;
        for (int j = 0; j < word.Length; ++j)
        {
            if (word[j] != '1') continue;
            carry = 3 * carry + (BigInteger.One << j);
            ++x.S;
        }
        x.M = BigInteger.One << x.K;
        x.P = BigInteger.Pow(3, x.S);
        x.D = x.M - x.P;
        x.C = carry;
        return x;
    }

    static bool PrimitiveFirstCrossing(string word)
    {
        BigInteger p2 = 1, p3 = 1;
        for (int j = 0; j < word.Length; ++j)
        {
            if (p3 < p2) return false;
            p2 <<= 1;
            if (word[j] == '1') p3 *= 3;
        }
        return p3 < p2;
    }

    static string Move(string word, int j)
    {
        char[] bits = word.ToCharArray();
        bits[j] = '0';
        bits[j + 1] = '1';
        return new string(bits);
    }

    static int FcdIndicator(BigInteger carry, BigInteger M, BigInteger D,
        BigInteger dInverse, BigInteger mInverse)
    {
        BigInteger rho = Mod(carry * dInverse, M);
        BigInteger tau = Mod(carry * mInverse, D);
        BigInteger numerator = D * rho + M * tau - carry;
        if (numerator % (M * D) != 0) throw new Exception("CRT lift failed");
        BigInteger e = numerator / (M * D);
        if (e != 0 && e != 1) throw new Exception("indicator escaped {0,1}");
        return (int)e;
    }

    static string Coordinates(BigInteger carry, BigInteger M, BigInteger D,
        BigInteger dInverse, BigInteger mInverse)
    {
        BigInteger rho = Mod(carry * dInverse, M);
        BigInteger tau = Mod(carry * mInverse, D);
        return carry + "(rho=" + rho + ",tau=" + tau + ",e=" +
            FcdIndicator(carry, M, D, dInverse, mInverse) + ")";
    }

    static readonly HashSet<string> Seen = new HashSet<string>();
    static long words, feasibleSquares, parameterPairs, testedCarries;
    static string firstAbstractIsland = "";
    static string firstNoncycleAbstractIsland = "";
    static string firstNontrivialAbstractIsland = "";

    static void Record(string word, int bruteProductLimit)
    {
        ++words;
        Data bottom = GetData(word);
        if (bottom.M * bottom.D > bruteProductLimit) return;
        for (int a = 0; a + 1 < word.Length; ++a)
        {
            if (word[a] != '1' || word[a + 1] != '0') continue;
            string wa = Move(word, a);
            if (!PrimitiveFirstCrossing(wa)) continue;
            for (int b = a + 2; b + 1 < word.Length; ++b)
            {
                if (word[b] != '1' || word[b + 1] != '0') continue;
                string wb = Move(word, b);
                if (!PrimitiveFirstCrossing(wb)) continue;
                string topA = Move(wa, b);
                string topB = Move(wb, a);
                if (topA != topB || !PrimitiveFirstCrossing(topA)) continue;
                ++feasibleSquares;
                BigInteger deltaA = GetData(wa).C - bottom.C;
                BigInteger deltaB = GetData(wb).C - bottom.C;
                if (deltaB < deltaA)
                {
                    BigInteger swap = deltaA;
                    deltaA = deltaB;
                    deltaB = swap;
                }
                string key = bottom.M + ":" + bottom.D + ":" +
                    deltaA + ":" + deltaB;
                if (!Seen.Add(key)) continue;
                ++parameterPairs;
                BigInteger dInverse = Inv(bottom.D, bottom.M);
                BigInteger mInverse = Inv(bottom.M, bottom.D);
                BigInteger ceiling = bottom.M * bottom.D - deltaA - deltaB;
                for (BigInteger carry = 1; carry < ceiling; carry += 2)
                {
                    ++testedCarries;
                    if (FcdIndicator(carry, bottom.M, bottom.D,
                            dInverse, mInverse) != 1) continue;
                    if (FcdIndicator(carry + deltaA, bottom.M, bottom.D,
                            dInverse, mInverse) != 1) continue;
                    if (FcdIndicator(carry + deltaB, bottom.M, bottom.D,
                            dInverse, mInverse) != 1) continue;
                    if (FcdIndicator(carry + deltaA + deltaB, bottom.M,
                            bottom.D, dInverse, mInverse) != 0) continue;
                    string record = "word=" + word + ":M=" + bottom.M +
                        ":D=" + bottom.D + ":Cvirtual=" + carry +
                        ":deltaA=" + deltaA + ":deltaB=" + deltaB +
                        ":corners=[" + Coordinates(carry, bottom.M, bottom.D,
                            dInverse, mInverse) + ";" +
                        Coordinates(carry + deltaA, bottom.M, bottom.D,
                            dInverse, mInverse) + ";" +
                        Coordinates(carry + deltaB, bottom.M, bottom.D,
                            dInverse, mInverse) + ";" +
                        Coordinates(carry + deltaA + deltaB, bottom.M,
                            bottom.D, dInverse, mInverse) + "]";
                    if (firstAbstractIsland.Length == 0)
                        firstAbstractIsland = record;
                    BigInteger topTau = Mod((carry + deltaA + deltaB) *
                        mInverse, bottom.D);
                    if (topTau != 0)
                    {
                        if (firstNoncycleAbstractIsland.Length == 0)
                            firstNoncycleAbstractIsland = record;
                        BigInteger topRho = Mod((carry + deltaA + deltaB) *
                            dInverse, bottom.M);
                        if (topRho > 1)
                        {
                            firstNontrivialAbstractIsland = record;
                            return;
                        }
                    }
                }
            }
        }
    }

    static void Dfs(int maxLength, int bruteProductLimit, string word,
        BigInteger p2, BigInteger p3)
    {
        if (firstNontrivialAbstractIsland.Length != 0 ||
            word.Length >= maxLength) return;
        BigInteger nextP2 = p2 << 1;
        if (p3 < nextP2) Record(word + "0", bruteProductLimit);
        else Dfs(maxLength, bruteProductLimit, word + "0", nextP2, p3);
        Dfs(maxLength, bruteProductLimit, word + "1", nextP2, p3 * 3);
    }

    public static void Main(string[] args)
    {
        int maxLength = args.Length > 0 ? int.Parse(args[0]) : 14;
        int bruteProductLimit = args.Length > 1 ? int.Parse(args[1]) : 20000000;
        Dfs(maxLength, bruteProductLimit, "", 1, 1);
        Console.WriteLine("maxLength=" + maxLength + ":productLimit=" +
            bruteProductLimit + ":words=" + words + ":feasibleSquares=" +
            feasibleSquares + ":parameterPairs=" + parameterPairs +
            ":testedCarries=" + testedCarries);
        Console.WriteLine("firstAbstractIsland=" +
            (firstAbstractIsland.Length == 0 ? "none" : firstAbstractIsland));
        Console.WriteLine("firstNoncycleAbstractIsland=" +
            (firstNoncycleAbstractIsland.Length == 0 ? "none" :
                firstNoncycleAbstractIsland));
        Console.WriteLine("firstNontrivialAbstractIsland=" +
            (firstNontrivialAbstractIsland.Length == 0 ? "none" :
                firstNontrivialAbstractIsland));
    }
}
