import { useParams } from "react-router-dom";
import ShowList from "../../components/ShowList/ShowList";
import { Categories, Sections } from "../../typescript/types";

import "./ListingPage.scss";

export default function ListingPage() {
  const params = useParams<{ category: Categories, section: Sections }>();
  const categoryFormatted = params.category;

  return (
    <div className="page">
      <div className="page__content-wrapper">
        {true && (
          <ShowList
            section={params.section}
            title={`Your ${categoryFormatted} Shows`}
            category={params.category}
          />
        )}
      </div>
    </div>
  );
}
