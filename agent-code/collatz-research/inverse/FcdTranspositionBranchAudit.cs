using System;
using System.Collections.Generic;
using System.Numerics;

// Audits the exact branch cocycle for an admissible adjacent move 10 -> 01.
// This is a structural regression test, not an all-depth FCD certificate.
public static class FcdTranspositionBranchAudit
{
    struct Data
    {
        public int K, S;
        public BigInteger M, P, D, C, Rho, Z, Tau, Branch;
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
        x.Rho = Mod(-carry * Inv(x.P, x.M), x.M);
        x.Z = (x.P * x.Rho + carry) / x.M;
        x.Tau = Mod(carry * Inv(x.M, x.D), x.D);
        BigInteger d = x.Z - x.Rho;
        BigInteger shadowDrop = x.D + d;
        x.Branch = (shadowDrop - x.Tau) / x.D;
        if (x.Branch != 0 && x.Branch != 1)
            throw new Exception("two-lift branch escaped {0,1}");
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

    static readonly long[,] IndicatorCounts = new long[2, 2];
    static readonly string[,] FirstIndicator = new string[2, 2];
    static long words, moves;

    static void Record(string word)
    {
        ++words;
        Data before = GetData(word);
        for (int j = 0; j + 1 < word.Length; ++j)
        {
            if (word[j] != '1' || word[j + 1] != '0') continue;
            char[] bits = word.ToCharArray();
            bits[j] = '0';
            bits[j + 1] = '1';
            string afterWord = new string(bits);
            if (!PrimitiveFirstCrossing(afterWord)) continue;
            ++moves;
            Data after = GetData(afterWord);
            BigInteger delta = after.C - before.C;
            BigInteger L = Mod(delta * Inv(before.P, before.M), before.M);
            BigInteger numerator = before.D * L + delta;
            if (numerator % before.M != 0) throw new Exception("V not integral");
            BigInteger V = numerator / before.M;
            int chi = before.Rho < L ? 1 : 0;
            int eta = before.Tau + V >= before.D ? 1 : 0;
            ++IndicatorCounts[eta, chi];
            if (FirstIndicator[eta, chi] == null)
                FirstIndicator[eta, chi] = word + "->" + afterWord +
                    ":rho=" + before.Rho + ":tau=" + before.Tau +
                    ":L=" + L + ":V=" + V;
            if (after.Branch != before.Branch + eta - chi)
                throw new Exception("branch cocycle failed");
        }
    }

    static void Dfs(int maxLength, string word, BigInteger p2, BigInteger p3)
    {
        if (word.Length >= maxLength) return;
        BigInteger nextP2 = p2 << 1;
        if (p3 < nextP2) Record(word + "0");
        else Dfs(maxLength, word + "0", nextP2, p3);
        Dfs(maxLength, word + "1", nextP2, p3 * 3);
    }

    public static void Main(string[] args)
    {
        int maxLength = args.Length == 0 ? 25 : int.Parse(args[0]);
        Dfs(maxLength, "", 1, 1);
        Console.WriteLine("maxLength=" + maxLength + ":words=" + words +
            ":moves=" + moves);
        for (int eta = 0; eta <= 1; ++eta)
            for (int chi = 0; chi <= 1; ++chi)
                Console.WriteLine("eta=" + eta + ":chi=" + chi +
                    ":count=" + IndicatorCounts[eta, chi] +
                    ":first=" + (FirstIndicator[eta, chi] ?? "none"));
    }
}
