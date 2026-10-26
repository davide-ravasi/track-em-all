import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Loader from '../../components/Loader/Loader';
import PhotoList from '../../components/PhotoList/PhotoList';
import { getUrlImages } from '../../utils';
import { useQuery } from '@tanstack/react-query';

export default function PersonPage() {
  const { id }: { id: string } = useParams();
  // @TODO create and external function for this url
  const personUrl = `${import.meta.env.VITE_BASE_PERSON_URL}${id}?api_key=${
    import.meta.env.VITE_API_KEY
  }&language=en-US`;
  const photosUrl = `${
    import.meta.env.VITE_BASE_PERSON_URL
  }${id}/images?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`;

  const {
    data: personData,
    error: personError,
    isLoading: personIsLoading,
  } = useQuery({
    queryKey: ['person', id],
    queryFn: () => fetch(personUrl).then((res) => res.json()),
  });

  const {
    data: imagesData,
    error: photosError,
    isLoading: photosIsLoading,
  } = useQuery({
    queryKey: ['photos', id],
    queryFn: () => fetch(photosUrl).then((res) => res.json()),
  });

  const pageTitle = personData?.name
    ? `${personData.name} | Track'em All`
    : "Person | Track'em All";

  const rawBiography = personData?.biography?.trim() ?? '';
  const metaDescription =
    rawBiography.length === 0
      ? personData?.name
        ? personData.known_for_department
          ? `${personData.name} (${personData.known_for_department}) on Track'em All.`
          : `Biography and photos for ${personData.name} on Track'em All.`
        : "Track TV shows with Track'em All."
      : rawBiography.length <= 160
        ? rawBiography
        : `${rawBiography.slice(0, 157).trimEnd()}...`;

  const ogImage =
    getUrlImages('big', personData?.profile_path) ||
    'https://trackem-all.netlify.app/og-image.png';

  const websiteBase = (
    import.meta.env.VITE_WEBSITE_BASE_URL || 'https://trackem-all.netlify.app'
  ).replace(/\/$/, '');
  const canonicalUrl = `${websiteBase}/person/${id}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <link rel='canonical' href={canonicalUrl} />
        <meta name='description' content={metaDescription} />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={metaDescription} />
        <meta property='og:image' content={ogImage} />
        <meta property='og:url' content={canonicalUrl} />
        <meta property='og:type' content='website' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={pageTitle} />
        <meta name='twitter:description' content={metaDescription} />
        <meta name='twitter:image' content={ogImage} />
        <meta
          name='twitter:image:alt'
          content={personData?.name ? String(personData.name) : "Track'em All"}
        />
        {personData && (
          <script type='application/ld+json'>
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: personData.name,
              description: metaDescription,
              image: ogImage,
              url: canonicalUrl,
              ...(personData.birthday && { birthDate: personData.birthday }),
              ...(personData.place_of_birth && {
                birthPlace: personData.place_of_birth,
              }),
            })}
          </script>
        )}
      </Helmet>
      <main id='main-content' className='page'>
        <div className='page__content-wrapper'>
          {personError && (
            <div className='loading-error' role='alert'>
              {personError.message}
            </div>
          )}
          {personIsLoading && (
            <div
              className='loader'
              aria-live='polite'
              aria-atomic='true'
              role='status'
              aria-label='Loading person information'
            >
              <Loader aria-hidden='true' aria-busy='true' />
            </div>
          )}

          {personData && (
            <>
              <h1 className='page__title'>{personData.name}</h1>
              <div className='page__content'>
                <div className='page__image'>
                  <img
                    alt={`${personData.name} portrait`}
                    src={getUrlImages('thumb', personData.profile_path)}
                    width='100%'
                  />
                </div>
                <section className='page__description'>
                  <h2>Biography</h2>
                  <p>{personData.biography}</p>
                  <div className='page__details'>
                    <p>
                      Birthday: {personData.birthday} -{' '}
                      {personData.place_of_birth}
                    </p>
                    <p>Roles: {personData.known_for_department}</p>
                    {personData.homepage && (
                      <p>Website: {personData.homepage}</p>
                    )}
                  </div>
                </section>
              </div>

              {imagesData ? (
                <section className='page__photos' data-testid='section-photos'>
                  {photosError && (
                    <div className='loading-error' role='alert'>
                      {photosError.message}
                    </div>
                  )}
                  {photosIsLoading && (
                    <div
                      className='loader'
                      aria-live='polite'
                      aria-atomic='true'
                      role='status'
                      aria-label='Loading photos'
                    >
                      <Loader aria-hidden='true' aria-busy='true' />
                    </div>
                  )}

                  <PhotoList imagesData={imagesData.profiles} />
                </section>
              ) : (
                <p>No photos available.</p>
              )}
              <section className='page__related' data-testid='section-related'>
                <h2>Related</h2>
                <p>Coming soon</p>
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
}
