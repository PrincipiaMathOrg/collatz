// Exact finite checker for a coalescing-order conjecture inside the
// proper-barrier language of accelerated Collatz exponent words.
//
// For every word w=(a_0,...,a_{r-1}) with 2^{A_k}<3^k at every prefix,
// define C_0=0, C_{k+1}=3C_k+2^{A_k}.  Its compatible endpoint class is
//
//     rho(w) = C(w) 2^{-A(w)}  (mod 3^r).
//
// If two words have the same rho, the checker reconstructs their ancestors
// at the least positive odd endpoint in that class and verifies:
//   (i) no two colliding words have the same total exponent A;
//  (ii) lower A gives a strictly smaller positive ancestor.
//
// This is a finite certificate only.  The code uses uint64_t and is intended
// for depths <=25 (the default tested depth is 21).

#include <algorithm>
#include <chrono>
#include <cstdint>
#include <cstdlib>
#include <iostream>
#include <string>
#include <vector>

using u64 = std::uint64_t;
using u128 = __uint128_t;

struct Record {
    u64 residue;
    u64 ancestor;
    u64 carry;
    std::uint8_t total_exponent;
};

static u64 mul_mod(u64 a, u64 b, u64 modulus) {
    return static_cast<u64>((static_cast<u128>(a) * b) % modulus);
}

static u64 inverse_mod(u64 a, u64 modulus) {
    __int128 t = 0;
    __int128 new_t = 1;
    __int128 r = modulus;
    __int128 new_r = a;
    while (new_r != 0) {
        const u64 quotient = static_cast<u64>(r / new_r);
        const __int128 next_t = t - static_cast<__int128>(quotient) * new_t;
        t = new_t;
        new_t = next_t;
        const __int128 next_r = r - static_cast<__int128>(quotient) * new_r;
        r = new_r;
        new_r = next_r;
    }
    if (r != 1) {
        std::cerr << "modular inverse does not exist\n";
        std::exit(2);
    }
    if (t < 0) {
        t += modulus;
    }
    return static_cast<u64>(t);
}

static void enumerate(
    int prefix_length,
    int depth,
    int total_exponent,
    u64 carry,
    const std::vector<u64>& powers_of_three,
    const std::vector<u64>& inverse_powers_of_two,
    std::vector<Record>& records
) {
    if (prefix_length == depth) {
        const u64 modulus = powers_of_three[depth];
        const u64 residue = mul_mod(
            carry % modulus,
            inverse_powers_of_two[total_exponent],
            modulus
        );

        // Odd representatives in a class modulo the odd modulus are spaced
        // by 2*modulus.  This is the least positive one.
        u64 endpoint = residue == 0 ? modulus : residue;
        if ((endpoint & 1U) == 0) {
            endpoint += modulus;
        }

        const __int128 numerator =
            (static_cast<__int128>(1) << total_exponent) * endpoint - carry;
        if (numerator <= 0 || numerator % modulus != 0) {
            std::cerr << "ancestor reconstruction failed\n";
            std::exit(2);
        }
        const u64 ancestor = static_cast<u64>(numerator / modulus);
        if ((ancestor & 1U) == 0) {
            std::cerr << "reconstructed ancestor is not odd\n";
            std::exit(2);
        }

        records.push_back(Record{
            residue,
            ancestor,
            carry,
            static_cast<std::uint8_t>(total_exponent)
        });
        return;
    }

    const u64 next_barrier = powers_of_three[prefix_length + 1];
    for (int a = 1;
         total_exponent + a < 63 &&
         (u64{1} << (total_exponent + a)) < next_barrier;
         ++a) {
        enumerate(
            prefix_length + 1,
            depth,
            total_exponent + a,
            3 * carry + (u64{1} << total_exponent),
            powers_of_three,
            inverse_powers_of_two,
            records
        );
    }
}

int main(int argc, char** argv) {
    const int depth = argc > 1 ? std::stoi(argv[1]) : 21;
    if (depth < 1 || depth > 25) {
        std::cerr << "depth must lie in [1,25]\n";
        return 2;
    }

    std::vector<u64> powers_of_three(depth + 1, 1);
    for (int i = 1; i <= depth; ++i) {
        powers_of_three[i] = 3 * powers_of_three[i - 1];
    }
    const u64 modulus = powers_of_three[depth];

    int max_total_exponent = 0;
    while (max_total_exponent + 1 < 63 &&
           (u64{1} << (max_total_exponent + 1)) < modulus) {
        ++max_total_exponent;
    }

    std::vector<u64> inverse_powers_of_two(max_total_exponent + 1, 1);
    const u64 inverse_two = inverse_mod(2, modulus);
    for (int a = 1; a <= max_total_exponent; ++a) {
        inverse_powers_of_two[a] =
            mul_mod(inverse_powers_of_two[a - 1], inverse_two, modulus);
    }

    std::vector<Record> records;
    records.reserve(40'000'000);

    const auto start = std::chrono::steady_clock::now();
    enumerate(
        0, depth, 0, 0,
        powers_of_three,
        inverse_powers_of_two,
        records
    );
    const auto generated = std::chrono::steady_clock::now();

    std::sort(records.begin(), records.end(), [](const Record& left, const Record& right) {
        if (left.residue != right.residue) {
            return left.residue < right.residue;
        }
        if (left.total_exponent != right.total_exponent) {
            return left.total_exponent < right.total_exponent;
        }
        return left.ancestor < right.ancestor;
    });
    const auto sorted = std::chrono::steady_clock::now();

    u64 residue_classes = 0;
    u64 same_exponent_collisions = 0;
    u64 order_violations = 0;
    u64 minimum_positive_margin = UINT64_MAX;

    for (std::size_t i = 0; i < records.size();) {
        ++residue_classes;
        std::size_t j = i;
        int previous_exponent = -1;
        u64 previous_ancestor = 0;

        while (j < records.size() && records[j].residue == records[i].residue) {
            const int exponent = records[j].total_exponent;
            const u64 ancestor = records[j].ancestor;

            if (exponent == previous_exponent) {
                ++same_exponent_collisions;
                if (same_exponent_collisions == 1) {
                    std::cerr
                        << "same-A collision at residue=" << records[j].residue
                        << " A=" << exponent << '\n';
                }
            } else if (previous_exponent >= 0) {
                if (ancestor <= previous_ancestor) {
                    ++order_violations;
                    if (order_violations == 1) {
                        std::cerr
                            << "order violation at residue=" << records[j].residue
                            << " previous_A=" << previous_exponent
                            << " previous_n=" << previous_ancestor
                            << " A=" << exponent
                            << " n=" << ancestor << '\n';
                    }
                } else {
                    minimum_positive_margin = std::min(
                        minimum_positive_margin,
                        ancestor - previous_ancestor
                    );
                }
            }

            previous_exponent = exponent;
            previous_ancestor = ancestor;
            ++j;
        }
        i = j;
    }

    const auto checked = std::chrono::steady_clock::now();
    const auto seconds = [](auto left, auto right) {
        return std::chrono::duration<double>(right - left).count();
    };

    std::cout
        << "depth=" << depth
        << " barrier_words=" << records.size()
        << " endpoint_residues=" << residue_classes
        << " collided_words=" << (records.size() - residue_classes)
        << " same_A_collisions=" << same_exponent_collisions
        << " order_violations=" << order_violations
        << " minimum_positive_margin="
        << (minimum_positive_margin == UINT64_MAX ? 0 : minimum_positive_margin)
        << " generation_seconds=" << seconds(start, generated)
        << " sorting_seconds=" << seconds(generated, sorted)
        << " checking_seconds=" << seconds(sorted, checked)
        << '\n';

    return (same_exponent_collisions == 0 && order_violations == 0) ? 0 : 1;
}
