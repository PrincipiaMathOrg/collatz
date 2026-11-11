#include <algorithm>
#include <cstdint>
#include <cstdlib>
#include <iomanip>
#include <iostream>
#include <limits>
#include <unordered_map>
#include <utility>
#include <vector>

// Exact finite search for 2 d <= m_0-1 on U_-(m) trajectories ending at 1.
// Every odd seed <= limit is followed until it reaches a memoized state,
// repeats, exceeds uint64_t arithmetic, or reaches max_steps.

struct Step {
  std::uint64_t next;
  unsigned exponent;
  bool overflow;
};

static Step step_minus(std::uint64_t n) {
  const __uint128_t z = static_cast<__uint128_t>(n) * 3 - 1;
  if (z > std::numeric_limits<std::uint64_t>::max()) return {0, 0, true};
  const std::uint64_t u = static_cast<std::uint64_t>(z);
  const unsigned a = __builtin_ctzll(u);
  return {u >> a, a, false};
}

struct Record {
  std::uint64_t seed = 0;
  std::uint64_t d = 0;
  std::uint64_t steps = 0;
  std::int64_t slack = std::numeric_limits<std::int64_t>::max();
};

static void retain_small_slack(std::vector<Record>& records, const Record& x) {
  records.push_back(x);
  std::sort(records.begin(), records.end(), [](const Record& a, const Record& b) {
    if (a.slack != b.slack) return a.slack < b.slack;
    return a.seed < b.seed;
  });
  if (records.size() > 20) records.pop_back();
}

static void retain_large_ratio(std::vector<Record>& records, const Record& x) {
  records.push_back(x);
  std::sort(records.begin(), records.end(), [](const Record& a, const Record& b) {
    const __uint128_t lhs = static_cast<__uint128_t>(a.d) * (b.seed - 1);
    const __uint128_t rhs = static_cast<__uint128_t>(b.d) * (a.seed - 1);
    if (lhs != rhs) return lhs > rhs;
    return a.seed < b.seed;
  });
  if (records.size() > 20) records.pop_back();
}

int main(int argc, char** argv) {
  const std::uint64_t limit = argc > 1 ? std::strtoull(argv[1], nullptr, 10) : 10000000;
  const std::uint64_t max_steps = argc > 2 ? std::strtoull(argv[2], nullptr, 10) : 100000;
  if (limit < 1 || !(limit & 1)) {
    std::cerr << "limit must be a positive odd integer\n";
    return 2;
  }

  // status for odd n<=limit: 0 unknown, 1 reaches 1, 2 enters another cycle.
  // d_to_one and steps_to_one are meaningful for status 1.
  const std::size_t slots = static_cast<std::size_t>((limit + 1) / 2);
  std::vector<std::uint8_t> status(slots, 0);
  std::vector<std::uint16_t> d_to_one(slots, 0);
  std::vector<std::uint16_t> steps_to_one(slots, 0);
  status[0] = 1; // n=1

  std::uint64_t reaches_one = 0, other_cycle = 0, unresolved = 0;
  std::uint64_t max_value_seen = 1, longest_steps = 0, longest_seed = 1;
  std::uint64_t counterexamples = 0;
  Record best;
  std::vector<Record> small_slack, large_ratio;
  std::vector<std::uint64_t> min_seed_for_d(1, 1);

  struct Node { std::uint64_t n; unsigned is_nonunit; };
  std::vector<Node> path;
  path.reserve(1024);
  std::unordered_map<std::uint64_t, std::size_t> local;
  local.reserve(2048);

  for (std::uint64_t seed = 1; seed <= limit; seed += 2) {
    path.clear();
    local.clear();
    std::uint64_t n = seed;
    int terminal_status = 0;
    std::uint64_t tail_d = 0, tail_steps = 0;

    while (path.size() < max_steps) {
      max_value_seen = std::max(max_value_seen, n);
      if (n <= limit) {
        const std::size_t idx = static_cast<std::size_t>((n - 1) / 2);
        if (status[idx]) {
          terminal_status = status[idx];
          if (terminal_status == 1) {
            tail_d = d_to_one[idx];
            tail_steps = steps_to_one[idx];
          }
          break;
        }
      }
      if (local.find(n) != local.end()) {
        terminal_status = 2;
        break;
      }
      local.emplace(n, path.size());
      const Step st = step_minus(n);
      if (st.overflow) break;
      path.push_back({n, st.exponent > 1 ? 1U : 0U});
      n = st.next;
    }

    if (!terminal_status) {
      ++unresolved;
      continue;
    }

    std::uint64_t running_d = tail_d;
    std::uint64_t running_steps = tail_steps;
    for (auto it = path.rbegin(); it != path.rend(); ++it) {
      running_d += it->is_nonunit;
      ++running_steps;
      if (it->n <= limit) {
        const std::size_t idx = static_cast<std::size_t>((it->n - 1) / 2);
        status[idx] = static_cast<std::uint8_t>(terminal_status);
        if (terminal_status == 1) {
          if (running_d > std::numeric_limits<std::uint16_t>::max() ||
              running_steps > std::numeric_limits<std::uint16_t>::max()) {
            std::cerr << "memo field overflow\n";
            return 3;
          }
          d_to_one[idx] = static_cast<std::uint16_t>(running_d);
          steps_to_one[idx] = static_cast<std::uint16_t>(running_steps);
        }
      }
    }

    const std::size_t seed_idx = static_cast<std::size_t>((seed - 1) / 2);
    if (status[seed_idx] == 1) {
      ++reaches_one;
      const std::uint64_t d = d_to_one[seed_idx];
      const std::uint64_t steps = steps_to_one[seed_idx];
      if (steps > longest_steps) { longest_steps = steps; longest_seed = seed; }
      const __int128 slack128 = static_cast<__int128>(seed) - 1 - 2 * static_cast<__int128>(d);
      if (slack128 < 0) {
        ++counterexamples;
        std::cout << "COUNTEREXAMPLE seed=" << seed << " d=" << d
                  << " steps=" << steps << " slack=" << static_cast<long long>(slack128) << "\n";
      }
      const std::int64_t slack = static_cast<std::int64_t>(slack128);
      if (seed > 1 && slack < best.slack) best = {seed, d, steps, slack};
      if (seed > 1) {
        const Record rec{seed, d, steps, slack};
        if (small_slack.size() < 20 || slack <= small_slack.back().slack)
          retain_small_slack(small_slack, rec);
        if (large_ratio.size() < 20 ||
            static_cast<__uint128_t>(d) * (large_ratio.back().seed - 1) >=
                static_cast<__uint128_t>(large_ratio.back().d) * (seed - 1))
          retain_large_ratio(large_ratio, rec);
      }
      if (d >= min_seed_for_d.size()) min_seed_for_d.resize(d + 1, 0);
      if (!min_seed_for_d[d]) min_seed_for_d[d] = seed;
    } else {
      ++other_cycle;
    }
  }

  std::cout << "limit " << limit << "\n"
            << "reaches_one " << reaches_one << "\n"
            << "other_cycle " << other_cycle << "\n"
            << "unresolved " << unresolved << "\n"
            << "counterexamples " << counterexamples << "\n"
            << "max_value_seen " << max_value_seen << "\n"
            << "longest_seed " << longest_seed << "\n"
            << "longest_steps " << longest_steps << "\n"
            << "best_positive_seed " << best.seed << "\n"
            << "best_positive_d " << best.d << "\n"
            << "best_positive_steps " << best.steps << "\n"
            << "best_positive_slack " << best.slack << "\n";
  std::cout << "min_seed_by_d";
  for (std::size_t d = 0; d < min_seed_for_d.size(); ++d) {
    if (min_seed_for_d[d]) std::cout << ' ' << d << ':' << min_seed_for_d[d];
  }
  std::cout << "\n";
  std::cout << "smallest_slack seed:d:steps:slack";
  for (const auto& x : small_slack)
    std::cout << ' ' << x.seed << ':' << x.d << ':' << x.steps << ':' << x.slack;
  std::cout << "\n";
  std::cout << "largest_ratio seed:d:steps:2d/(seed-1)";
  for (const auto& x : large_ratio)
    std::cout << ' ' << x.seed << ':' << x.d << ':' << x.steps << ':'
              << std::setprecision(12) << (2.0 * x.d / (x.seed - 1));
  std::cout << "\n";
}
