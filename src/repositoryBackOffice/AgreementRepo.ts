import { Agreement } from "../models/Agreement";
interface IAgreement {
    save(agreement: Agreement): Promise<Agreement>;
    retrieveAll(): Promise<Agreement[]>;
  retrieveAll2(AgreementId: number): Promise<Agreement | null> 
}

export class AgreementRepo implements IAgreement {

    /* async save(agreement: Agreement): Promise<Agreement> {
            try {
                const savedAgreement = await Agreement.create({
    
                    AgreementId: agreement.AgreementId,
                    AgreementTitle: agreement.AgreementTitle,
                    AgreementBody: agreement.AgreementBody,
                    createdBy: agreement.createdBy,
                    isDeleted: false,
                   
    
                });
                return savedAgreement;
            } catch (error) {
                throw new Error("Failed to create Agreement! " + error);
            }
        }*/

              async save(agreement: Partial<Agreement>): Promise<Agreement> {
    try {
      return await Agreement.create({
       AgreementTitle: agreement.AgreementTitle?.toString(),
      AgreementBody: agreement.AgreementBody?.toString(),
      companyId: agreement.companyId,
      createdBy: Number(agreement.createdBy), // Conversion numérique
      pdfPath: agreement.pdfPath,
        isDeleted: agreement.isDeleted || false,
        createdAt: agreement.createdAt || new Date(),
        updatedAt: agreement.updatedAt || new Date()
      });
    } catch (error) {
      throw new Error(`Échec de la création de l'accord: ${(error as Error).message}`);
    }
  }

  
      async update(id: number, agreement: Partial<Agreement>): Promise<Agreement | null> {
  try {
    const existingAgreement = await Agreement.findByPk(id);
    if (!existingAgreement) return null;
    
    return await existingAgreement.update({
      ...agreement,
      updatedAt: new Date()
    });
  } catch (error) {
    throw new Error(`Échec de la mise à jour: ${(error as Error).message}`);
  }
}


     async retrieveAll(): Promise<Agreement[]> {
          try {
              return await Agreement.findAll({
                  where: { isDeleted: false},
              });
          } catch (error) {
              throw new Error(`Failed to retrieve all contart: ${error}`);
          }
      }

         async retrieveAll2(AgreementId: number): Promise<Agreement | null> {
              try {
                  return await Agreement.findOne({
                      where: { isDeleted: false, AgreementId: AgreementId },
                  });
              } catch (error) {
                  throw new Error(`Failed to retrieve all Agreement: ${error}`);
              }
          }
}
