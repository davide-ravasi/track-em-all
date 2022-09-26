import { useParams } from "react-router-dom";
import ShowList from "../../components/ShowList/ShowList";
import { Categories, Sections } from "../../typescript/types";

import "./ListingPage.scss";

export default function ListingPage() {
  const params = useParams<{ category: Categories }>();

  // useEffect(() => {}, []);

  return (
    <div className="page">
      <div className="page__content-wrapper">
        {true && (
          <ShowList section={Sections.Tv} title="Your Favorite Shows" category={params.category} />
        )}
      </div>
    </div>
  );
}
