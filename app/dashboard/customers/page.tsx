import { fetchFilteredCustomers } from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Customers',
    description: 'View your customers.',

    robots: {
        index: false,
        follow: false,
    },
};

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    const customers = await fetchFilteredCustomers(query);

    return <CustomersTable customers={customers} />;
}
