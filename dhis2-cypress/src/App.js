import { useDataQuery } from '@dhis2/app-runtime'
import {
    DataTable,
    DataTableRow,
    DataTableColumnHeader,
    DataTableCell,
    DataTableToolbar,
    TableBody,
    TableHead,
    Pagination,
} from '@dhis2/ui'
import React from 'react'

const dataElementsQuery = {
    dataElements: {
        resource: 'dataElements',
        params: ({ page, pageSize }) => ({ page, pageSize }),
    },
}

export default function MyApp() {
    const { loading, error, data, refetch } = useDataQuery(dataElementsQuery, {
        variables: {
            page: 1,
            pageSize: 10,
        },
    })

    if (loading) {
        return 'Loading...'
    }

    if (error) {
        return `Error: ${error.message}`
    }

    const { pager, dataElements } = data.dataElements

    return (
        <DataTable>
            <TableHead>
                <DataTableRow>
                    <DataTableColumnHeader>ID</DataTableColumnHeader>

                    <DataTableColumnHeader>Display name</DataTableColumnHeader>
                </DataTableRow>
            </TableHead>

            <TableBody>
                {dataElements.map(({ id, displayName }) => (
                    <DataTableRow key={id} dataTest="data-element-row">
                        <DataTableCell dataTest="data-element-id">
                            {id}
                        </DataTableCell>

                        <DataTableCell dataTest="data-element-displayname">
                            {displayName}
                        </DataTableCell>
                    </DataTableRow>
                ))}
            </TableBody>

            <TableBody>
                <tr>
                    <td colSpan="2">
                        <DataTableToolbar>
                            <Pagination
                                onPageChange={page =>
                                    refetch({ ...pager, page })
                                }
                                onPageSizeChange={pageSize =>
                                    refetch({
                                        ...pager,
                                        pageSize,
                                        page: 1,
                                    })
                                }
                                page={pager.page}
                                pageCount={pager.pageCount}
                                pageSize={pager.pageSize}
                                total={pager.total}
                            />
                        </DataTableToolbar>
                    </td>
                </tr>
            </TableBody>
        </DataTable>
    )
}
