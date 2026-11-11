using System;
using System.Numerics;

// Tests the exact interval consequences of a delay-minimal hypothetical
// FCD failure.  For every admissible immediate left predecessor 10 -> 01,
// minimality would force rho < M-L and tau < V at the target word.
// This program asks whether the intersection rectangle alone contradicts
// C = D*rho + M*tau.  It does not assume the observed FCD sign.
public static class FcdMinimalFailureCellAudit
{
    struct Data
    {
        public int K, S;
        public BigInteger M, P, D, C, Rho, Tau, Y;
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
        x.Tau = Mod(carry * Inv(x.M, x.D), x.D);
        x.Y = x.P == 1 ? BigInteger.Zero :
            Mod(carry * Inv(x.M, x.P), x.P);
        if (x.P > 1 && x.Y == 0)
            throw new Exception("dual representative vanished");
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

    static long words, wordsWithLeftCells, rectangleExclusions, rectangleSurvivors;
    static string firstSurvivor = "";
    static string smallestSlackWord = "";
    static BigInteger smallestSlack = BigInteger.Zero;
    static string firstMinVAboveOne = "";
    static long tauBelowMinV;
    static string firstTauBelowMinV = "";
    static long rhoBelowMinA;
    static string firstRhoBelowMinA = "";
    static long bothCoordinateIntervals;
    static string firstBothCoordinateIntervals = "";
    static long dualBoxExclusions, dualBoxSurvivors;
    static string firstDualBoxSurvivor = "";
    static long bothDualIntervals;
    static string firstBothDualIntervals = "";

    static void Record(string word)
    {
        ++words;
        Data target = GetData(word);
        BigInteger minA = target.M;
        BigInteger minV = target.D;
        BigInteger minY = target.P;
        int cells = 0;
        string cellRecord = "";

        for (int j = 0; j + 1 < word.Length; ++j)
        {
            if (word[j] != '0' || word[j + 1] != '1') continue;
            char[] bits = word.ToCharArray();
            bits[j] = '1';
            bits[j + 1] = '0';
            string predecessorWord = new string(bits);
            if (!PrimitiveFirstCrossing(predecessorWord)) continue;
            Data predecessor = GetData(predecessorWord);
            BigInteger delta = target.C - predecessor.C;
            BigInteger L = Mod(delta * Inv(target.P, target.M), target.M);
            BigInteger numerator = target.D * L + delta;
            if (numerator % target.M != 0) throw new Exception("V not integral");
            BigInteger V = numerator / target.M;
            BigInteger A = target.M - L;
            BigInteger h = L - V;
            BigInteger yBound = target.P - h;
            if (A < minA) minA = A;
            if (V < minV) minV = V;
            if (yBound < minY) minY = yBound;
            ++cells;
            cellRecord += (cellRecord.Length == 0 ? "" : ",") +
                "j" + j + "(A=" + A + ",V=" + V +
                ",Y=" + yBound + ")";
        }

        if (cells == 0) return;
        ++wordsWithLeftCells;
        if (minV > 1 && firstMinVAboveOne.Length == 0)
            firstMinVAboveOne = word + ":minV=" + minV + ":" + cellRecord;
        if (target.Tau < minV)
        {
            ++tauBelowMinV;
            if (firstTauBelowMinV.Length == 0)
                firstTauBelowMinV = word + ":tau=" + target.Tau +
                    ":minV=" + minV + ":" + cellRecord;
        }
        if (target.Rho < minA)
        {
            ++rhoBelowMinA;
            if (firstRhoBelowMinA.Length == 0)
                firstRhoBelowMinA = word + ":rho=" + target.Rho +
                    ":minA=" + minA + ":" + cellRecord;
        }
        if (target.Tau < minV && target.Rho < minA)
        {
            ++bothCoordinateIntervals;
            if (firstBothCoordinateIntervals.Length == 0)
                firstBothCoordinateIntervals = word + ":rho=" + target.Rho +
                    ":minA=" + minA + ":tau=" + target.Tau +
                    ":minV=" + minV + ":" + cellRecord;
        }
        if (target.Tau < minV && target.Y < minY)
        {
            ++bothDualIntervals;
            if (firstBothDualIntervals.Length == 0)
                firstBothDualIntervals = word + ":tau=" + target.Tau +
                    ":minV=" + minV + ":Y=" + target.Y +
                    ":minY=" + minY + ":" + cellRecord;
        }

        // Under a minimal failure, 0 <= rho <= minA-1 and
        // 0 <= tau <= minV-1.  This is the largest possible lower-lift carry.
        BigInteger rectangleMaximum = target.D * (minA - 1) +
            target.M * (minV - 1);
        BigInteger slack = rectangleMaximum - target.C;
        if (slack < 0)
        {
            ++rectangleExclusions;
        }

        else
        {
            ++rectangleSurvivors;
            if (firstSurvivor.Length == 0)
                firstSurvivor = word + ":C=" + target.C + ":A=" + minA +
                    ":V=" + minV + ":slack=" + slack + ":" + cellRecord;
            if (smallestSlackWord.Length == 0 || slack < smallestSlack)
            {
                smallestSlack = slack;
                smallestSlackWord = word + ":C=" + target.C + ":A=" +
                    minA + ":V=" + minV + ":" + cellRecord;
            }
        }

        // A minimal failure also has Y=Z=rho+tau and C=D*Y+P*tau.
        // The FCD predecessor across each cell has endpoint Y+h < P,
        // hence Y <= minY-1 and tau <= minV-1.
        BigInteger dualBoxMaximum = target.D * (minY - 1) +
            target.P * (minV - 1);
        if (target.C > dualBoxMaximum)
        {
            ++dualBoxExclusions;
        }
        else
        {
            ++dualBoxSurvivors;
            if (firstDualBoxSurvivor.Length == 0)
                firstDualBoxSurvivor = word + ":C=" + target.C +
                    ":Y=" + minY + ":V=" + minV +
                    ":dualSlack=" + (dualBoxMaximum - target.C) +
                    ":" + cellRecord;
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
            ":withLeftCells=" + wordsWithLeftCells);
        Console.WriteLine("rectangleExclusions=" + rectangleExclusions +
            ":rectangleSurvivors=" + rectangleSurvivors);
        Console.WriteLine("firstSurvivor=" + firstSurvivor);
        Console.WriteLine("smallestSurvivorSlack=" + smallestSlack +
            ":at=" + smallestSlackWord);
        Console.WriteLine("firstMinVAboveOne=" + firstMinVAboveOne);
        Console.WriteLine("tauBelowMinV=" + tauBelowMinV +
            ":first=" + firstTauBelowMinV);
        Console.WriteLine("rhoBelowMinA=" + rhoBelowMinA +
            ":first=" + firstRhoBelowMinA);
        Console.WriteLine("bothCoordinateIntervals=" + bothCoordinateIntervals +
            ":first=" + firstBothCoordinateIntervals);
        Console.WriteLine("dualBoxExclusions=" + dualBoxExclusions +
            ":dualBoxSurvivors=" + dualBoxSurvivors);
        Console.WriteLine("firstDualBoxSurvivor=" + firstDualBoxSurvivor);
        Console.WriteLine("bothDualIntervals=" + bothDualIntervals +
            ":first=" + firstBothDualIntervals);
    }
}
