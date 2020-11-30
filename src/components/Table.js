import React from "react";
import { Box, DataTable, Meter, Text } from "grommet";
import { RoutedAnchor } from "../components"

export const Table = ({ columns, data }) => (
  <Box width="large">
    <DataTable
      // fill={true}
      size="medium"
      columns={columns || []}
      data={data || []}
    />
  </Box>
)