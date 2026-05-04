import {StorageTable} from "@/components/pages/StorageTable.tsx";
import type {State} from "@epfl-si/react-appauth";

export const Body = ({ oidc }: { oidc: State }) => {

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Gestion des lieux de Stockage</h1>
          <p className="text-gray-500 text-sm mt-1">Gérez vos emplacements.</p>
        </div>
      </div>

      <StorageTable oidc={oidc} />
    </div>
  );
}
