import { useEffect, useState } from 'react';
import { OfferData } from '../types/offer';
import { OffersData } from '../types/offers';
import { UserComments } from '../types/comments';
import { api } from '../store';

const useOfferData = (id: number) => {
  const [offer, setOffer] = useState<OfferData | null>(null);
  const [loading, setLoading] = useState(true);
  const [offersNear, setOffersNear] = useState<OffersData[] | null>(null);
  const [comments, setComments] = useState<UserComments[] | null>(null);

  useEffect(() => {
    const fetchDataOffer = async () => {
      try {
        const [offerResponse, offersNearResponse, offerComments] = await Promise.all([
          api.get<OfferData>(`/hotels/${id}`),
          api.get<OffersData[]>(`/hotels/${id}/nearby`),
          api.get<UserComments[]>(`/comments/${id}`)
        ]);

        setOffer(offerResponse.data);
        setOffersNear(offersNearResponse.data);
        setComments(offerComments.data);

        setLoading(false);

      } catch (error) {
        // eslint-disable-next-line
        console.error(error)
      }
    };

    fetchDataOffer();
  }, [id]);

  return { offer, setOffer, offersNear, loading, comments, setComments };
};

export default useOfferData;
