import { useQuery } from "graphql-hooks";
import { useEffect, useState } from "react";
import { FlightFilters } from "../../graphql/types";
import { GET_FLIGHTS_QUERY } from "../../lib/constants/flights";
import FlightResults from "../2-molecules/FlightResults";

import { NextPage } from "next";
import SearchFilters from "../2-molecules/SearchFilters";
import BaseLayout from "../4-layouts/BaseLayout";

const HomePage: NextPage = () => {
  const [submittedFilters, setSubmittedFilters] = useState<Partial<FlightFilters>>({ airline: "", date: "" });
  const [loading, setLoading] = useState(false);

  // Fetch flights only when the form is submitted
  const {
    data,
    loading: queryLoading,
    error,
  } = useQuery(GET_FLIGHTS_QUERY, {
    variables: Object.fromEntries(Object.entries(submittedFilters).filter(([_, value]) => value !== "" && value !== undefined)),
  });

  useEffect(() => {
    setLoading(queryLoading);
  }, [queryLoading]);

  return (
    <BaseLayout className="home">
      <div className="w-full max-w-3xl min-h-screen flex flex-col items-center px-4 py-6">
        {/* Search Filters Component */}
        <SearchFilters onSearch={setSubmittedFilters} />

        {/* Results Wrapper */}
        <div className="w-full flex-grow flex flex-col">
          {/* Loading / Error Handling */}
          {loading && <p className="text-center text-gray-500 mt-4 animate-pulse">Loading flights...</p>}
          {error && <p className="text-center text-red-500 mt-4">{error.graphQLErrors?.[0]?.message || "Something went wrong."}</p>}

          {/* Flight Results */}
          {!loading && data?.flights?.length > 0 && (
            <div className="w-full mt-6">
              <FlightResults flights={data.flights} />
            </div>
          )}

          {/* No Results Found */}
          {!loading && data?.flights?.length === 0 && <p className="text-center text-gray-500 mt-6">No flights found. Try adjusting your search.</p>}
        </div>
      </div>
    </BaseLayout>
  );
};

export default HomePage;
