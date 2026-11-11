using System;
using System.Collections.Generic;
using System.Numerics;

// Exact finite search for primitive first coefficient crossings.  It is a
// falsifier and pattern finder, not a proof of any unbounded statement.
public static class FrontierSearch
{
    private sealed class Stats
    {
        public long Count;
        public long NegativeMargin;
        public long ZeroMargin;
        public long FcdViolations;
        public bool HasMinJ;
        public BigInteger MinJ;
        public string MinWord = "";
        public BigInteger MinRho;
        public BigInteger MinZ;
        public BigInteger MinC;
        public int Ones;
        public long RightMoves;
        public long RightMovesJUp;
        public long RightMovesJDown;
        public long RightMovesJEqual;
        public string FirstJDown = "";
    }

    private static readonly Dictionary<int, Stats> ByLength = new Dictionary<int, Stats>();

    private static BigInteger Mod(BigInteger x, BigInteger m)
    {
        x %= m;
        return x.Sign < 0 ? x + m : x;
    }

    private static BigInteger InverseMod(BigInteger a, BigInteger m)
    {
        BigInteger oldR = a, r = m;
        BigInteger oldS = 1, s = 0;
        while (r != 0)
        {
            BigInteger q = oldR / r;
            BigInteger nextR = oldR - q * r;
            oldR = r;
            r = nextR;
            BigInteger nextS = oldS - q * s;
            oldS = s;
            s = nextS;
        }
        if (oldR != 1) throw new InvalidOperationException("not invertible");
        return Mod(oldS, m);
    }

    private static void Score(
        int k,
        int ones,
        BigInteger carry,
        out BigInteger rho,
        out BigInteger z,
        out BigInteger j)
    {
        BigInteger two = BigInteger.One << k;
        BigInteger three = BigInteger.Pow(3, ones);
        rho = Mod(-carry * InverseMod(three, two), two);
        BigInteger zNumerator = three * rho + carry;
        if (zNumerator % two != 0) throw new InvalidOperationException();
        z = zNumerator / two;
        j = (two - three) * rho - carry;
        if (j != two * (rho - z)) throw new InvalidOperationException();
    }

    private static BigInteger CarryOf(string word)
    {
        BigInteger c = 0;
        int k = 0;
        int s = 0;
        foreach (char bit in word)
        {
            if (bit == '1')
            {
                c = 3 * c + (BigInteger.One << k);
                s++;
            }
            k++;
        }
        return c;
    }

    private static bool IsPrimitive(string word)
    {
        BigInteger p3 = 1, p2 = 1;
        for (int i = 0; i < word.Length; i++)
        {
            if (word[i] == '1') p3 *= 3;
            p2 *= 2;
            if (i + 1 < word.Length && p3 < p2) return false;
        }
        return p3 < p2;
    }

    private static void Record(string word, int ones, BigInteger carry)
    {
        int k = word.Length;
        Stats stats;
        if (!ByLength.TryGetValue(k, out stats))
        {
            stats = new Stats();
            ByLength[k] = stats;
        }
        stats.Count++;
        BigInteger rho, z, j;
        Score(k, ones, carry, out rho, out z, out j);
        if (j < 0) stats.NegativeMargin++;
        if (j == 0) stats.ZeroMargin++;
        // J=0 is harmless only for rho=0 (the even one-step cylinder, whose
        // least positive representative is 2^k) and rho=1 (the excluded
        // starting value 1; every later representative has positive margin).
        if (j < 0 || (j == 0 && rho > 1)) stats.FcdViolations++;
        if (!stats.HasMinJ || j < stats.MinJ)
        {
            stats.HasMinJ = true;
            stats.MinJ = j;
            stats.MinWord = word;
            stats.MinRho = rho;
            stats.MinZ = z;
            stats.MinC = carry;
            stats.Ones = ones;
        }

        // Audit the tempting monotonicity under each barrier-preserving 10->01.
        for (int i = 0; i + 1 < k; i++)
        {
            if (word[i] != '1' || word[i + 1] != '0') continue;
            char[] chars = word.ToCharArray();
            chars[i] = '0'; chars[i + 1] = '1';
            string moved = new string(chars);
            if (!IsPrimitive(moved)) continue;
            BigInteger movedC = CarryOf(moved);
            BigInteger movedRho, movedZ, movedJ;
            Score(k, ones, movedC, out movedRho, out movedZ, out movedJ);
            stats.RightMoves++;
            int cmp = movedJ.CompareTo(j);
            if (cmp > 0) stats.RightMovesJUp++;
            else if (cmp < 0)
            {
                stats.RightMovesJDown++;
                if (stats.FirstJDown.Length == 0)
                    stats.FirstJDown = word + " -> " + moved;
            }
            else stats.RightMovesJEqual++;
        }
    }

    private static void Dfs(
        int maxLength,
        string word,
        int ones,
        BigInteger p3,
        BigInteger p2,
        BigInteger carry)
    {
        if (word.Length >= maxLength) return;

        // Append zero.  The carry is unchanged.
        BigInteger nextP2 = p2 * 2;
        string zeroWord = word + "0";
        if (p3 < nextP2) Record(zeroWord, ones, carry);
        else Dfs(maxLength, zeroWord, ones, p3, nextP2, carry);

        // Append one.  This can never create the first downward crossing.
        string oneWord = word + "1";
        BigInteger oneCarry = 3 * carry + p2;
        Dfs(maxLength, oneWord, ones + 1, p3 * 3, nextP2, oneCarry);
    }

    public static void Main(string[] args)
    {
        int maxLength = args.Length == 0 ? 25 : int.Parse(args[0]);
        Dfs(maxLength, "", 0, 1, 1, 0);
        Console.WriteLine("k,count,negative,zero,FCDviolations,minJ,ones,rho,z,word,rightMoves,Jup,Jdown,Jequal,firstJdown");
        foreach (var pair in ByLength)
        {
            int k = pair.Key;
            Stats s = pair.Value;
            Console.WriteLine(string.Format(
                "{0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14}",
                k, s.Count, s.NegativeMargin, s.ZeroMargin, s.FcdViolations,
                s.MinJ, s.Ones, s.MinRho, s.MinZ, s.MinWord, s.RightMoves,
                s.RightMovesJUp, s.RightMovesJDown, s.RightMovesJEqual,
                s.FirstJDown));
        }
    }
}
