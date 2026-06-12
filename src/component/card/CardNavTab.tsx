import { FC } from 'react'
import _ from 'lodash'
import { TabTitle } from '@/component/general/TitleGeneral.tsx'
import { isFirstOfList } from '@/helper/base/condition.helper.js'
import joinClassNameHelper from '@/helper/base/joinClassName.helper.ts'
import { CardNavTabProps } from './type/card.type'


const CardNavTab: FC<CardNavTabProps> = ({
    tabs = [],
    tabContents = [],
    className = '',
    classNameTab = '',
    classNameTabContent = '',
    classNameTabPane = '',
    id = 'nav-tab-card',
    actions = {
        handleClickTab: () => {},
    },
    config = {
        style: {},
    },
}) => {
    return (
        <div className={'card border-0' + (className ? ` ${className}` : '')}>
            <div className="w-100">
                <ul
                    className={
                        'nav nav-tabs nav-tabs-simple nav-tabs-primary long-tab' +
                        (classNameTab ? ` ${classNameTab}` : '')
                    }
                    id={id}
                    role="tablist">
                    {tabs.map((tab, index) =>
                        !_.isEmpty(tab) ? (
                            <li
                                className="nav-item"
                                key={index}
                                onClick={() => actions.handleClickTab(tab.id)}>
                                <a
                                    className={
                                        'nav-link border-0 text-capitalize' +
                                        (isFirstOfList(index) ? ' active' : '')
                                    }
                                    id={'nav-tab-' + tab.id}
                                    data-bs-toggle="tab"
                                    href={'#' + id + tab.id}
                                    role="tab"
                                    aria-controls="nav-component"
                                    aria-selected="false">
                                    {tab.count && tab.count > 0 ? (
                                        <div className="wp-btn-filter position-relative">
                                            <p
                                                className="btn-count-filter fs-10 fw-500 text-black-100 rounded-circle bg-primary"
                                                style={{
                                                    top: '-10px',
                                                    right: '-16px',
                                                    minWidth: '22px',
                                                    height: '22px',
                                                }}>
                                                {tab.count > 9
                                                    ? '9+'
                                                    : tab.count}
                                            </p>
                                            {tab.name}
                                        </div>
                                    ) : (
                                        <span>{tab.name}</span>
                                    )}
                                </a>
                            </li>
                        ) : null,
                    )}
                </ul>

                <div
                    className={
                        'tab-content' +
                        (classNameTabContent ? ` ${classNameTabContent}` : '')
                    }
                    style={{ ...config.style }}>
                    {tabContents.map((vm, index) => {
                        return !_.isEmpty(vm) ? (
                            <div
                                className={joinClassNameHelper(
                                    'tab-pane fade',
                                    classNameTabPane,
                                    { 'show active': isFirstOfList(index) },
                                )}
                                key={index}
                                id={id + (tabs[index]?.id || '')}
                                role="tabpanel">
                                {vm.title ? (
                                    <TabTitle
                                        title={vm.title}
                                        className={vm.classNameTitle || ''}
                                    />
                                ) : null}
                                {vm.content}
                            </div>
                        ) : null
                    })}
                </div>
            </div>
        </div>
    )
}

export default CardNavTab
