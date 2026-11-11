// Exact finite checker for the compressed marked-carry first-descent lemma.
//
// Put m=2K+1 in the positive accelerated 3x-1 system.  Uncharged steps are
// K -> 3K/2 when K is even.  Define
//
//     R(K) = 2^{v_3(K)} * (K / 3^{v_3(K)}),   R(0)=0.
//
// R is invariant under uncharged steps.  On a 3-free q=R(K), write
// q=2^t u with u odd, set K_hat=3^t u, take the next charged K-step, and
// apply R again.  The resulting deterministic map Q counts one marked carry
// per iteration.
//
// For every q<=N not divisible by 3, this checker finds the first L with
// Q^L(q)<q (if found before the step cap) and verifies
//
//     L <= 2 * (q - Q^L(q)).
//
// This is a finite certificate only.  unsigned __int128 is used throughout;
// the program aborts rather than silently wrapping on the checked operations.

#include <algorithm>
#include <chrono>
#include <cstdint>
#include <cstdlib>
#include <iostream>
#include <limits>
#include <string>

using u64 = std::uint64_t;
using u128 = __uint128_t;

static constexpr u128 U128_MAX = ~u128{0};

static std::string to_string_u128(u128 value) {
    if (value == 0) {
        return "0";
    }
    std::string result;
    while (value != 0) {
        result.push_back(static_cast<char>('0' + value % 10));
        value /= 10;
    }
    std::reverse(result.begin(), result.end());
    return result;
}

static int valuation_two(u128 value) {
    if (value == 0) {
        std::cerr << "v2(0) is undefined\n";
        std::exit(2);
    }
    int exponent = 0;
    while ((value & 1U) == 0) {
        value >>= 1;
        ++exponent;
    }
    return exponent;
}

static u128 checked_multiply(u128 left, u128 right) {
    if (right != 0 && left > U128_MAX / right) {
        std::cerr << "unsigned __int128 multiplication overflow\n";
        std::exit(2);
    }
    return left * right;
}

static u128 power_three(int exponent) {
    u128 value = 1;
    for (int i = 0; i < exponent; ++i) {
        value = checked_multiply(value, 3);
    }
    return value;
}

static u128 Q(u128 q) {
    if (q == 0 || q % 3 == 0) {
        std::cerr << "Q expects a positive 3-free input\n";
        std::exit(2);
    }

    const int t = valuation_two(q);
    const u128 odd_part = q >> t;
    const u128 charged_K = checked_multiply(power_three(t), odd_part);
    const u128 three_K = checked_multiply(charged_K, 3);
    if (three_K == U128_MAX) {
        std::cerr << "unsigned __int128 addition overflow\n";
        std::exit(2);
    }
    const u128 value = three_K + 1;
    const int b = valuation_two(value);
    u128 next_K = ((value >> b) - 1) >> 1;
    if (next_K == 0) {
        return 0;
    }

    int e = 0;
    while (next_K % 3 == 0) {
        next_K /= 3;
        ++e;
    }
    if (e >= 128 || next_K > (U128_MAX >> e)) {
        std::cerr << "unsigned __int128 shift overflow\n";
        std::exit(2);
    }
    return next_K << e;
}

int main(int argc, char** argv) {
    const u64 limit = argc > 1 ? std::stoull(argv[1]) : 1'000'000'000ULL;
    const int step_cap = argc > 2 ? std::stoi(argv[2]) : 10'000;
    if (limit < 1 || step_cap < 1) {
        std::cerr << "limit and step cap must be positive\n";
        return 2;
    }

    u64 checked_inputs = 0;
    u64 no_first_descent = 0;
    u64 violations = 0;
    long double worst_ratio = 0;
    u64 worst_q = 0;
    int worst_length = 0;
    u128 worst_endpoint = 0;
    u128 largest_value_seen = 0;

    const auto start = std::chrono::steady_clock::now();

    for (u64 q0 = 1; q0 <= limit; ++q0) {
        if (q0 % 3 == 0) {
            continue;
        }
        ++checked_inputs;

        u128 q = q0;
        bool descended = false;
        for (int length = 1; length <= step_cap; ++length) {
            q = Q(q);
            largest_value_seen = std::max(largest_value_seen, q);

            if (q < static_cast<u128>(q0)) {
                descended = true;
                const u128 drop = static_cast<u128>(q0) - q;
                const long double ratio =
                    static_cast<long double>(length) /
                    static_cast<long double>(static_cast<u64>(drop));
                if (ratio > worst_ratio) {
                    worst_ratio = ratio;
                    worst_q = q0;
                    worst_length = length;
                    worst_endpoint = q;
                }

                if (static_cast<u128>(length) > 2 * drop) {
                    ++violations;
                    std::cout
                        << "VIOLATION q=" << q0
                        << " first_descent_length=" << length
                        << " endpoint=" << to_string_u128(q)
                        << " drop=" << to_string_u128(drop)
                        << '\n';
                    return 1;
                }
                break;
            }
        }

        if (!descended) {
            ++no_first_descent;
            if (no_first_descent <= 20) {
                std::cerr << "no first descent within cap: q=" << q0 << '\n';
            }
        }
    }

    const auto end = std::chrono::steady_clock::now();
    const double elapsed = std::chrono::duration<double>(end - start).count();

    std::cout
        << "limit=" << limit
        << " checked_3_free_inputs=" << checked_inputs
        << " no_first_descent_within_cap=" << no_first_descent
        << " violations=" << violations
        << " worst_ratio=" << static_cast<double>(worst_ratio)
        << " worst_q=" << worst_q
        << " worst_length=" << worst_length
        << " worst_endpoint=" << to_string_u128(worst_endpoint)
        << " largest_value_seen=" << to_string_u128(largest_value_seen)
        << " elapsed_seconds=" << elapsed
        << '\n';

    return violations == 0 ? 0 : 1;
}
