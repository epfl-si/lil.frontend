import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
// import { fetchStorageDetails } from "@/lib/graphql/fetchingTools";

export const BarcodeDetailPage = ({ oidc }: { oidc: any }) => {
  const { barcode } = useParams();
  console.log("Voici le codebarre dans l'url", barcode)
  useEffect(() => {
    console.log("Fetch info for :", barcode);
    // loadBarcodeData(codebarre, oidc.accessToken);
  }, [barcode]);

  return (
    <div className="p-8 max-w-4xl mx-auto">
    <Link
      to={`/`}
      className="mb-6"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
                                              Retour aux storages
    </Link>
      <h1 className="text-3xl font-bold mb-4">Détails du Code-barre {barcode}</h1>
    </div>
  );
};
