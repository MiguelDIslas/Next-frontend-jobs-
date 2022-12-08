import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faIndustry } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const router = useRouter();
  const [state, setState] = useState({
    keyword: "",
    location: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (state.keyword) {
      let searchQuery = `/?keyword=${state.keyword}`;
      if (state.location) searchQuery += `&location=${state.location}`;
      router.push(searchQuery);
    } else {
      router.push('/');
    }
  };

  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div className="w-100 h-100 position-relative">
            <a href="https://storyset.com/web">
              <img src="/images/job-search.svg" alt="search" layout="fill" />
            </a>
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2> SEARCH</h2>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <FontAwesomeIcon icon={faSearch} />
                  <input
                    id="keyword"
                    name="keyword"
                    type="text"
                    placeholder="Enter Your Keyword"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="inputBox">
                  <FontAwesomeIcon icon={faIndustry} />
                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="Enter City, State ..."
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="searchButtonWrapper">
                <button type="submit" className="searchButton">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
