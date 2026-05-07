import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Form from '@/app/ui/invoices/edit-form';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata(
    props: Props
): Promise<Metadata> {
    const params = await props.params;
    const id = params.id;

    const invoice = await fetchInvoiceById(id);

    if (!invoice) {
        return {
            title: 'Invoice Not Found',
        };
    }

    return {
        title: `Edit Invoice #${id}`,
        description: `Edit invoice ${id}.`,

        robots: {
            index: false,
            follow: false,
        },
    };
}

export default async function Page(props: Props) {
    const params = await props.params;
    const id = params.id;

    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
    ]);

    if (!invoice) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {
                        label: 'Invoices',
                        href: '/dashboard/invoices',
                    },
                    {
                        label: `Edit Invoice #${id}`,
                        href: `/dashboard/invoices/${id}/edit`,
                        active: true,
                    },
                ]}
            />

            <Form invoice={invoice} customers={customers} />
        </main>
    );
}
