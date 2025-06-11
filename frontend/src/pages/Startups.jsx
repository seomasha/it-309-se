import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import { startupService } from "../service/startupService";
import { photoService } from "../service/photoService";
import blankProfile from "../assets/blank-profile.png";
import StartupCard from "../components/StartupCard";

const Startups = () => {
  const [allStartups, setAllStartups] = useState([]);
  const [startups, setStartups] = useState([]);
  const [startupLogos, setStartupLogos] = useState({});
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

  console.log(startupLogos);

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

      // Fetch logos for all startups
      const logoPromises = response.map(async (startup) => {
        try {
          const logoResponse = await photoService.getPhotoByEntityAndRole(
            startup.id,
            "startup",
            "logo"
          );
          return { startupId: startup.id, logo: logoResponse };
        } catch (error) {
          console.error(
            `Failed to fetch logo for startup ${startup.id}:`,
            error
          );
          return { startupId: startup.id, logo: null };
        }
      });

      const logoResults = await Promise.all(logoPromises);
      const logoMap = logoResults.reduce((acc, { startupId, logo }) => {
        acc[startupId] = logo;
        return acc;
      }, {});

      setStartupLogos(logoMap);
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

            <div className="rounded-4 bg-white border p-5 mt-3">
              {startups.length === 0 ? (
                <p>No startups found.</p>
              ) : (
                <div className="row g-4">
                  {startups.map((startup) => (
                    <div key={startup.id} className="col-md-6">
                      {console.log(startupLogos[startup.id]?.url)}
                      <StartupCard
                        logo={startupLogos[startup.id]?.url || blankProfile}
                        name={startup.name}
                        description={startup.description}
                        industry={startup.industry}
                        companySize={startup.size}
                        location={startup.location}
                      />
                    </div>
                  ))}
                </div>
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
