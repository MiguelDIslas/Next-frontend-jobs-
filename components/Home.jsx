import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import { Container, Row, Col, Button } from "react-bootstrap";
import useDeviceSize from "../hooks/useDeviceSize.js";

//Custom Components
import JobItem from "./job/JobItem";
import Filters from "./layout/Filters";
import NoResults from "./layout/NoResults";

const Home = ({ data }) => {
  const { jobs, count, resPerPage } = data;
  const router = useRouter();
  const { keyword, location } = router.query;
  let { page = 1 } = router.query;
  page = Number(page);

  let queryParams;
  if (typeof window !== "undefined") {
    queryParams = new URLSearchParams(window.location.search);
  }

  const [width, height] = useDeviceSize();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [width, height]);

  const handlePageClick = (currentPage) => {
    if (queryParams.has("page")) {
      queryParams.set("page", currentPage);
    } else {
      queryParams.append("page", currentPage);
    }

    router.push({
      search: queryParams.toString(),
    });
  };

  return (
    <Container fluid>
      <Row>
        <Col xl={3} lg={4}>
          <Filters />
        </Col>
        <Col xl={9} lg={8} className="content-left-offset">
          <div className="my-5">
            <h4 className="page-title">
              {keyword ? `Results for ${keyword}` : "Latest Jobs"}
            </h4>
            <Link href="stats">
              <Button variant="secondary" className="float-right stats_btn">
                Get Topic stats
              </Button>
            </Link>
            <div className="d-block">
              <Link href='/search'>Go to Search</Link>
            </div>
          </div>
          {jobs.length === 0 ? (
            <NoResults />
          ) : (
            <>
              {jobs && jobs.map((job) => <JobItem key={job.id} job={job} />)}
              {resPerPage < count && (
                <div className="d-flex justify-content-center my-3">
                  <Pagination
                    activePage={page}
                    itemsCountPerPage={resPerPage}
                    totalItemsCount={count}
                    onChange={handlePageClick}
                    nextPageText={"Next"}
                    prevPageText={"Previous"}
                    firstPageText={"First"}
                    lastPageText={"Last"}
                    itemClass={"page-item"}
                    linkClass={"page-link"}
                  />
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
