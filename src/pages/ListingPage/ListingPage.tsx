import { useParams } from "react-router-dom";
import ShowList from "../../components/ShowList/ShowList";
import { Categories, Sections } from "../../typescript/types";

import "./ListingPage.scss";

export default function ListingPage() {
  const params = useParams<{
    category: Categories;
    section: Sections;
    id?: string;
  }>();
  const categoryFormatted = params.category;

  return (
    <main className="page">
      <div className="page__content-wrapper">
        <ShowList
          section={params.section}
          title={`Your ${categoryFormatted} Shows`}
          category={params.category}
          id={params.id}
        />
      </div>
    </main>
  );
}
