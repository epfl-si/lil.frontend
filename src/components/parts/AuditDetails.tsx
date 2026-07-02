import {useTranslation} from "react-i18next";

export const AuditDetails = ({ createdBy, createdOn, deletedBy, deletedOn, font }: {
  createdBy: string,
  createdOn: Date,
  deletedBy: string,
  deletedOn: Date,
  font?: 'sm' | 'xs'
}) => {
  const { t } = useTranslation();

  return (
    <div style={{display: 'flex', flexDirection: 'column'}} className={font === 'sm' ? 'mt-2 mb-6 text-sm text-gray-500' : 'mt-2 mb-6 text-xs text-gray-500'}>
      {t('app.createdBy')} {createdBy} {t('app.onDate')} {new Date(createdOn).toLocaleDateString('fr-CH')}
      {deletedBy && deletedOn && (
        <span className="text-red-500 font-medium">
          {t('app.deletedBy')} {deletedBy} {t('app.onDate')} {new Date(deletedOn).toLocaleDateString('fr-CH')}
        </span>
      )}
    </div>
  );
};
