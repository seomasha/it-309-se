import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import { startupService } from "../service/startupService";
import blankProfile from "../assets/blank-profile.png";
import StartupCard from "../components/StartupCard";

const Startups = () => {
  const [allStartups, setAllStartups] = useState([]);
  const [startups, setStartups] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [filters, setFilters] = useState({
    industry: [],
    size: [],
    location: [],
  });

  const [selectedFilters, setSelectedFilters] = useState({
    industry: [],
    size: [],
    location: [],
  });

  useEffect(() => {
    const fetchStartups = async () => {
      const response = await startupService.getAllStartups();
      setAllStartups(response);
      setStartups(response);
      setFilters({
        industry: [...new Set(response.map((s) => s.industry))],
        size: [...new Set(response.map((s) => s.size))],
        location: [...new Set(response.map((s) => s.location))],
      });
    };
    fetchStartups();
  }, []);

  const applyFilters = (query, selected) => {
    let filtered = allStartups;

    if (query) {
      filtered = filtered.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selected.industry.length) {
      filtered = filtered.filter((s) => selected.industry.includes(s.industry));
    }

    if (selected.size.length) {
      filtered = filtered.filter((s) => selected.size.includes(s.size));
    }

    if (selected.location.length) {
      filtered = filtered.filter((s) => selected.location.includes(s.location));
    }

    setStartups(filtered);
  };

  const handleSearch = (query) => {
    const trimmedQuery = query.trim();
    setSearchValue(trimmedQuery);

    if (trimmedQuery !== "" && !recentSearches.includes(trimmedQuery)) {
      setRecentSearches([trimmedQuery, ...recentSearches.slice(0, 4)]);
    }

    applyFilters(trimmedQuery, selectedFilters);
  };

  const handleFilterChange = (type, value) => {
    const current = selectedFilters[type];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    const newSelectedFilters = {
      ...selectedFilters,
      [type]: updated,
    };

    setSelectedFilters(newSelectedFilters);
    applyFilters(searchValue, newSelectedFilters);
  };

  const clearFilters = () => {
    setSelectedFilters({ industry: [], size: [], location: [] });
    applyFilters(searchValue, { industry: [], size: [], location: [] });
  };

  return (
    <div>
      <Navbar />

      <div className="body">
        <div className="d-flex container py-5 gap-3">
          <div className="col-2 bg-white rounded-4 border p-3">
            <div className="d-flex justify-content-between mb-3">
              <h6>Filters</h6>
              <p
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={clearFilters}
              >
                Clear
              </p>
            </div>

            {["industry", "size", "location"].map((filterType) => (
              <div key={filterType} className="mb-3">
                <h6 className="text-capitalize">{filterType}</h6>
                {filters[filterType].map((value) => (
                  <div key={value} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={selectedFilters[filterType].includes(value)}
                      onChange={() => handleFilterChange(filterType, value)}
                      id={`${filterType}-${value}`}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`${filterType}-${value}`}
                    >
                      {value}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="col-7">
            <SearchBar
              value={searchValue}
              onChange={setSearchValue}
              onSearch={handleSearch}
            />

            <div className="d-flex rounded-4 bg-white border p-5 mt-3 gap-3 justify-content-center">
              {startups.length === 0 ? (
                <p>No startups found.</p>
              ) : (
                startups
                  .reduce((rows, startup, index) => {
                    if (index % 2 === 0) {
                      rows.push([startup]);
                    } else {
                      rows[rows.length - 1].push(startup);
                    }
                    return rows;
                  }, [])
                  .map((pair, rowIndex) => (
                    <div className="row w-100 mb-4" key={rowIndex}>
                      {pair.map((startup) => (
                        <div key={startup.id} className="mt-3">
                          <StartupCard
                            logo={blankProfile}
                            name={startup.name}
                            description={startup.description}
                            industry={startup.industry}
                            companySize={startup.size}
                            location={startup.location}
                          />
                        </div>
                      ))}
                    </div>
                  ))
              )}
            </div>
          </div>

          <div className="col-3 bg-white rounded-4 border p-3 h-100">
            <div className="d-flex justify-content-between">
              <p>Recent searches</p>
              <p
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => setRecentSearches([])}
              >
                Clear
              </p>
            </div>
            <div>
              {recentSearches.map((search, index) => (
                <h6
                  key={index}
                  className="primary-color"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSearch(search)}
                >
                  {search}
                </h6>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Startups;
