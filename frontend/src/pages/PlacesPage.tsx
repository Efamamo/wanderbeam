import { useEffect, useState } from "react";
import { FilterMap, getPlaces, PlaceData } from "../API/places";
import "../styles/output.css";
import SearchBar from "../components/core/SearchBar";
import Pagination from "../components/core/PaginationComponent";
import Header from "../components/core/Header";
import Footer from "../components/core/Footer";
import PlacesList from "../components/Places/PlacesList";

const PlacesPages = () => {
  const [places, setPlaces] = useState<PlaceData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<FilterMap>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const fetchedPlaces = await getPlaces(filters, searchTerm);
        setPlaces(fetchedPlaces);
      } catch (error) {
        console.log("Error fetching places:", error);
      }
    };
    fetchPlaces();
  }, [searchTerm, filters]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const indexOfLastPlace = currentPage * itemsPerPage;
  const indexOfFirstPlace = indexOfLastPlace - itemsPerPage;
  const currentPlaces = places.slice(indexOfFirstPlace, indexOfLastPlace);

  return (
    <main className="flex flex-col items-center gap-24">
      <Header />
      <div className="mt-24 max-w-2xl w-full flex justify-center items-center my-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      {places.length > 0 ? (
        <PlacesList places={currentPlaces} />
      ) : (
        <h1>No Items!</h1>
      )}
      <Pagination
        totalPages={Math.ceil(places.length / itemsPerPage)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <Footer bg="gray-100" />
    </main>
  );
};

export default PlacesPages;
