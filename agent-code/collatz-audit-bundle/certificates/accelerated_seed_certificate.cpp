// Independent exact C++ certificate for the accelerated target-one scan.
//
// U_-(m) = (3m-1)/2^{v_2(3m-1)} on positive odd integers.
// For every odd seed m < 200000, follow the deterministic orbit until it
// hits 1, repeats, or violates 2^{A_r} < 3^r.  Multiplication is checked in
// unsigned __int128; the barrier powers use boost::multiprecision::cpp_int.

#include <boost/multiprecision/cpp_int.hpp>

#include <algorithm>
#include <cstdint>
#include <cstdlib>
#include <iostream>
#include <limits>
#include <unordered_map>
#include <vector>

using boost::multiprecision::cpp_int;
using u64 = std::uint64_t;
using u128 = __uint128_t;

struct Result {
    enum class Status { hit_one, cycle, barrier_failure, step_cap, overflow };
    Status status;
    u64 steps;
    u64 largest;
};

static unsigned v2(u64 n) {
    if (n == 0) {
        std::cerr << "v2(0)\n";
        std::exit(2);
    }
    return static_cast<unsigned>(__builtin_ctzll(n));
}

static Result classify(u64 seed, u64 step_cap) {
    u64 m = seed;
    u64 largest = m;
    cpp_int pow2 = 1;
    cpp_int pow3 = 1;
    std::unordered_map<u64, u64> seen;
    seen.reserve(512);

    for (u64 r = 0; r < step_cap; ++r) {
        if (m == 1) return {Result::Status::hit_one, r, largest};
        if (seen.find(m) != seen.end()) return {Result::Status::cycle, r, largest};
        seen.emplace(m, r);

        const u128 z128 = static_cast<u128>(3) * m - 1;
        if (z128 > std::numeric_limits<u64>::max()) {
            return {Result::Status::overflow, r, largest};
        }
        const u64 z = static_cast<u64>(z128);
        const unsigned a = v2(z);
        m = z >> a;
        largest = std::max(largest, m);
        pow2 <<= a;
        pow3 *= 3;

        if (pow2 >= pow3) {
            return {Result::Status::barrier_failure, r + 1, largest};
        }
    }
    return {Result::Status::step_cap, step_cap, largest};
}

int main(int argc, char** argv) {
    const u64 cap = argc > 1 ? std::strtoull(argv[1], nullptr, 10) : 200000;
    const u64 step_cap = argc > 2 ? std::strtoull(argv[2], nullptr, 10) : 100000;
    if (cap <= 1 || step_cap == 0) return 2;

    u64 hit_one = 0, cycle = 0, barrier_failure = 0, unresolved = 0, overflow = 0;
    std::vector<std::pair<u64, u64>> hits;
    u64 longest_steps = 0, longest_seed = 1, largest_seen = 1;

    for (u64 seed = 1; seed < cap; seed += 2) {
        const Result result = classify(seed, step_cap);
        largest_seen = std::max(largest_seen, result.largest);
        if (result.steps > longest_steps) {
            longest_steps = result.steps;
            longest_seed = seed;
        }
        switch (result.status) {
            case Result::Status::hit_one:
                ++hit_one;
                hits.emplace_back(seed, result.steps);
                break;
            case Result::Status::cycle: ++cycle; break;
            case Result::Status::barrier_failure: ++barrier_failure; break;
            case Result::Status::step_cap: ++unresolved; break;
            case Result::Status::overflow: ++overflow; break;
        }
    }

    std::cout << "cap=" << cap << "\n"
              << "hit_1=" << hit_one << "\n"
              << "cycle=" << cycle << "\n"
              << "barrier_failure=" << barrier_failure << "\n"
              << "step_cap=" << unresolved << "\n"
              << "overflow=" << overflow << "\n"
              << "longest_resolution_steps=" << longest_steps << "\n"
              << "longest_resolution_seed=" << longest_seed << "\n"
              << "largest_value_seen=" << largest_seen << "\n";
    std::cout << "terminal_hits=";
    for (const auto& [seed, steps] : hits) std::cout << " (" << seed << "," << steps << ")";
    std::cout << "\n";

    const bool passed =
        hit_one == 1 && cycle == 2 && barrier_failure == 99997 &&
        unresolved == 0 && overflow == 0 && hits.size() == 1 &&
        hits[0].first == 1 && hits[0].second == 0 &&
        longest_steps == 83 && longest_seed == 149345;

    std::cout << "certificate_passed=" << (passed ? "True" : "False") << "\n";
    return passed ? 0 : 1;
}
