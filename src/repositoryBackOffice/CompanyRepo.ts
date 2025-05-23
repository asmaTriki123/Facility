import { Company } from "../models/Company";
import { User } from "../models/User";
interface ICompanyRepo {
    save(company: Company): Promise<Company>;
    retrieveById(companyId: number): Promise<Company>;
    Update(companyId: number): Promise<Company>
}
export class CompanyRepo implements ICompanyRepo {
    //  saved Company object (Repo)
    async save(company: Company): Promise<Company> {

        try {
            const savedCompany = await Company.create({
                companyName: company.companyName,
                companyEIN: company.companyEIN,
                companyAddress: company.companyAddress,
                companyCity: company.companyCity,
                companyPostalCode: company.companyPostalCode,
                companyState: company.companyState,
                companyCountry: company.companyCountry,
                createdBy: company.createdBy,
                isDeleted: false,
                createdAt: new Date(),
            });
            return savedCompany;
        } catch (error) {
            throw new Error("Failed to create Company!" + error);
        }
    }
    async checkEin(companyEIN: string): Promise<Company | null> {
        try {
            const company = await Company.findOne({
                where: {
                    companyEIN: companyEIN
                }
            });
            return company || null;
        }
        catch (error) {
            throw new Error("Failed to find  user by company EIN!" + error);

        }
    }



    async retrieveById(companyId: number): Promise<Company> {
        try {
            const new_company = await Company.findOne({
                where: {
                    companyId: companyId,
                },
            });

            // Vérifier si new_company est null
            if (!new_company) {
                throw new Error("Company not found!");
            }

            // Retourner l'objet Company
            return new_company;
        } catch (error) {
            throw new Error("Failed to find Company by id: " + error);
        }
    }


    async Update(companyId: number): Promise<Company> {
        try {
            const company = await Company.findOne({ where: { companyId: companyId } });

            if (!company) {
                throw new Error("Company not found!");
            }

            company.companyIsActive = !company.companyIsActive;
            await company.save();

            // Mettre à jour le statut des utilisateurs de cette compagnie
            await User.update(
                { userIsActive: company.companyIsActive },
                { where: { companyId: companyId } }
            );

            return company;
        } catch (error) {
            console.error("Error toggling company status:", error);
            throw new Error(`Failed to update company status: ${error}`);
        }
    }



    async retrieveAll(): Promise<Company[]> {
        try {

            return await Company.findAll({
                where: {
                    isDeleted: false,
                },
            });


        } catch (error) {
            throw new Error("Error fetching company: " + error);
        }
    }
}