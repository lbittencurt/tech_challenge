import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  padding: 4em;

  h2 {
    font-size: 20px;
    color: ${props => props.theme.colors.primary};
    /* margin-top: 40px; */
  }

  p {
    margin-top: 24px;
    font-size: 24px;
    line-height: 32px;
  }

  table {
    width: 100%;
    font-size: 14px;
    border-spacing: 0;

    thead {
      th:first-of-type {
        padding-left: .8em;
      }
      th:last-of-type {
        padding-right: .8em;
      }
      th + th {
        padding-left: 1em;
      }
    }

    tbody {
      td:first-of-type {
        padding-left: .8em;
      }
      td:last-of-type {
        padding-right: .8em;
      }
      td {
        padding-top: 1em;
        padding-bottom: 1em;
      }
      td + td {
        padding-left: 1em;
      }
      tr:nth-child(even) {
        background-color: #f5eff9;
      }
    }
  }

  th {
    color: #736969;
    text-align: left;
  }

  td {
    color: #736969;
    text-align: left;
  }
`

export const TableWraper = styled.div`
  padding-top: 2em;
  overflow: auto;
`
