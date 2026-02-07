import React from "react";
import SearchResults from "../SearchResults/SearchResults";
import { useDetectClickOutside } from "react-detect-click-outside";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import { showMovie } from "../../redux/reducers/movieModalSlice";

export default function NavBar() {
  const [search, setSearch] = React.useState("");
  const [showSearch, setShowSearch] = React.useState(false);
  const dispatch = useDispatch();

  // Fermer le dropdown quand on clique à l'extérieur
  const ref = useDetectClickOutside({ onTriggered: toggleSearchOff });

  function handleSetSearch(event) {
    setSearch(event.target.value);
    setShowSearch(true); // afficher automatiquement les résultats lors de la frappe
  }

  function toggleSearchOn() {
    setShowSearch(true);
  }

  function toggleSearchOff() {
    setShowSearch(false);
  }

  // Fonction pour gérer la sélection d'un film
  function handleSelectMovie(movie) {
    // Dispatch avec id + dataset (compatible slice actuel)
    dispatch(
      showMovie({
        id: movie.id,
        dataset: movie.dataset,
      }),
    );

    // Fermer le dropdown et vider le champ
    setShowSearch(false);
    setSearch("");
  }

  return (
    <div
      className="px-4 py-1 drop-shadow-xl flex items-center bg-neutral-800 sticky top-0 z-40 w-screen"
      style={{
        backgroundImage:
          'url("https://st2.depositphotos.com/8843414/12482/v/450/depositphotos_124824108-stock-illustration-abstract-hexagon-molecular-structure-pattern.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div style={{ transform: "scale(0.55)", transformOrigin: "left center" }}>
        <Logo />
      </div>

      <div className="relative flex w-1/2 ml-10" ref={ref}>
        <input
          type="text"
          id="simple-search"
          className="hover:bg-cyan-600 border border-neutral-700 text-neutral-100 text-sm rounded-lg p-2 w-full"
          placeholder="Search..."
          value={search}
          onChange={handleSetSearch}
          onFocus={toggleSearchOn}
          style={{
            fontFamily: "'Arabic Typesetting', serif",
            fontSize: "25px",
            padding: "0.75rem",
            color: "yellow",
            transition: "color 0.3s",
          }}
        />

        {showSearch && (
          <SearchResults search={search} onSelect={handleSelectMovie} />
        )}
      </div>
    </div>
  );
}
