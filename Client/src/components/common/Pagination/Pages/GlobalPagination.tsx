import { Pagination, SelectPicker } from 'rsuite';
import '../Styles/GlobalPagination.css';
import { useTranslation } from 'react-i18next';
const GlobalPagination = (props) => {
    const [t] = useTranslation('global');
    const limitOptions = [1, 2, 5, 10, 15, 20, 100];
    return (
        <>
            <div className="d-flex align-items-center justify-content-between page_container">
                <div>
                    <span style={{ marginLeft: 20 }}>
                        {t('pagination.total')}: {props?.total}
                    </span>
                    <span style={{ marginLeft: 20 }}>
                        {t('pagination.limit')}:
                        <SelectPicker
                            value={props?.limit}
                            onChange={(value) =>
                                props.handleLimit(parseInt(value))
                            }
                            cleanable={false}
                            placement="topEnd"
                            searchable={false}
                            data={limitOptions.map((key) => ({
                                value: key,
                                label: key,
                            }))}
                            className="ms-2"
                        />
                    </span>
                </div>
                <div>
                    <Pagination
                        layout={['pager']}
                        size={'lg'}
                        prev={true}
                        next={true}
                        first={true}
                        last={true}
                        ellipsis={true}
                        boundaryLinks={true}
                        total={props?.total}
                        limit={props?.limit}
                        limitOptions={limitOptions}
                        maxButtons={8}
                        activePage={props?.activePage}
                        onChangePage={(value) => props?.handleActivePage(value)}
                        onChangeLimit={(value) => props.handleLimit(value)}
                    />
                </div>
            </div>
        </>
    );
};

export default GlobalPagination;
