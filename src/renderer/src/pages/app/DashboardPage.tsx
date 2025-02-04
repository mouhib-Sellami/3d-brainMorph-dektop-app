import React from "react";
import { Box, Center, Flex, Grid, Title } from "@mantine/core";
import ChartCard from "@renderer/components/cards/chartCard/ChartCard";
import ContentWrapper from "@renderer/components/ui/ContentWrapper";
import HeaderWrapper from "@renderer/components/ui/HeaderWrapper";
import usePatients from "@renderer/hooks/usePatients";
import useTasks from "@renderer/hooks/useTasks";
import useTasksGroup from "@renderer/hooks/useTasksGroup";
import { pendingPatient, processedPatient, processingPatient } from "@renderer/redux/slices/patientSlice";
import { getTasks } from "@renderer/redux/slices/taskSlice";
import { dispatch } from "@renderer/redux/store";
import { BarChart, DonutChart, FunnelChart, RadarChart, Sparkline } from '@mantine/charts';
import CustomLoadingOverlay from "@renderer/components/customLoading/CustomLoadingOverlay";
import TasksDataTable from "@renderer/components/dataTables/task-datatable/TasksDataTable;";
import DashboardActionMenu from "@renderer/components/ActionMenu/DashboardActionMenu";

const DashboardPage: React.FC = () => {
    const [unprocessedCount, setUnprocessedCount] = React.useState(0);
    const [processingCount, setProcessingCount] = React.useState(0);
    const [processedCount, setProcessedCount] = React.useState(0);
    const { isLoading } = usePatients();
    const tasksHooks = useTasks();
    const { groupedByIsDone, getTasksChart, groupedByStatus, groupedByTaskType, getAverageExecutionTime } = useTasksGroup();
    
    const taskLoading = React.useMemo(() => {
        return tasksHooks.isLoading
    }, [tasksHooks.isLoading])

    const RECORDS = React.useMemo(() => {
        return [...tasksHooks.tasks].splice(0, 15)
    }, [tasksHooks.tasks])

    const fetchUnprocessedPatient = React.useCallback(async () => {
        const res = await dispatch(pendingPatient())
        if (res.meta.requestStatus == "fulfilled") {
            setUnprocessedCount(res.payload.length)
        }

    }, [])
    const fetchProcessedPatient = React.useCallback(async () => {
        const res = await dispatch(processedPatient())
        if (res.meta.requestStatus == "fulfilled") {
            setProcessedCount(res.payload.length)
        }
    }, [])

    const fetchProcessingPatient = React.useCallback(async () => {
        const res = await dispatch(processingPatient())
        if (res.meta.requestStatus == "fulfilled") {
            setProcessingCount(res.payload.length)
        }
    }, [])

    const fetchTasks_ = React.useCallback(async () => {
        await dispatch(getTasks())

    }, [])

    React.useEffect(() => {
        fetchTasks_()
        fetchUnprocessedPatient()
        fetchProcessingPatient()
        fetchProcessedPatient()
    }, [])

    const reload_ = React.useCallback(() => {
        fetchTasks_()
        fetchUnprocessedPatient()
        fetchProcessingPatient()
        fetchProcessedPatient()
    }, [])

    return (
        <Box>
            {isLoading || taskLoading ? <CustomLoadingOverlay /> : null}
            <HeaderWrapper>
                <Flex align={"center"} justify={"space-between"}>
                    <Title ta="left" c={"primary"}>
                        Dashboard
                    </Title>
                    <DashboardActionMenu reload={() => reload_()} position="bottom-end" />

                </Flex>
            </HeaderWrapper>
            <ContentWrapper>
                <Grid>
                    <Grid.Col span={3}>
                        <ChartCard title="Patient count"  >
                            <Center h={100}>
                                <Title order={2}>
                                    {processedCount + unprocessedCount}
                                </Title>
                            </Center>
                        </ChartCard>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <ChartCard title="Processing Patient"  >
                            <Center h={100}>
                                <Title order={2}>
                                    {processingCount}
                                </Title>
                            </Center>
                        </ChartCard>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <ChartCard title="Unprocessed Patient"  >
                            <Center h={100} >
                                <Title order={2}>
                                    {unprocessedCount}
                                </Title>
                            </Center>
                        </ChartCard>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <ChartCard title="Processed Patient"  >
                            <Center h={100} >
                                <Title order={2}>
                                    {processedCount}
                                </Title>
                            </Center>
                        </ChartCard>
                    </Grid.Col>

                </Grid>
                <Grid mt={"md"}>
                    <Grid.Col span={8}>
                        <ChartCard title="Job series"  >
                            <Center>
                                <Sparkline
                                    w={"100%"}
                                    h={150}
                                    data={getTasksChart(tasksHooks.tasks)}
                                    color="primary.6"
                                    fillOpacity={0.6}
                                    strokeWidth={2}
                                    curveType="bump"
                                />
                            </Center>
                        </ChartCard>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <ChartCard title="AVG. excution time"  >
                            <Center h={150} >
                                <Title order={2}>
                                    {Number(getAverageExecutionTime(tasksHooks.tasks).toFixed(2))} s
                                </Title>
                            </Center>
                        </ChartCard>
                    </Grid.Col>
                </Grid>
                <Grid mt={"md"}>
                    <Grid.Col span={6}>
                        <ChartCard title="Jobs by task"  >
                            <RadarChart
                                h={300}
                                data={groupedByTaskType(tasksHooks.tasks)}
                                dataKey="taskType"
                                withPolarRadiusAxis
                                series={[{ name: 'count', color: 'primary.4', opacity: 0.2 }]}
                            />
                        </ChartCard>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <ChartCard title="Job by status"  >
                            <Center>
                                <DonutChart
                                    h={300}
                                    withLabelsLine
                                    withTooltip
                                    withLabels

                                    data={groupedByStatus(tasksHooks.tasks)}
                                />
                            </Center>
                        </ChartCard>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <ChartCard title="Runned jobs"  >
                            <Center>
                                <BarChart
                                    h={300}
                                    data={groupedByTaskType(tasksHooks.tasks)}
                                    dataKey="taskType"
                                    withLegend
                                    series={[
                                        { name: 'count', color: 'primary.6' },
                                    ]}
                                />
                            </Center>
                        </ChartCard>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <ChartCard title="Finish / unfinished jobs"  >
                            <Center>
                                <Center h={300}>
                                    <FunnelChart
                                        withTooltip
                                        withLabels
                                        data={groupedByIsDone(tasksHooks.tasks)}
                                    />
                                </Center>
                            </Center>
                        </ChartCard>
                    </Grid.Col>

                </Grid>
                <Box mt={"md"}>
                    <ChartCard title="Tasks" isLoading={tasksHooks.isLoading} >
                        <TasksDataTable records={RECORDS} count={RECORDS.length} isLoading={tasksHooks.isLoading} />
                    </ChartCard>
                </Box>
            </ContentWrapper>
        </Box>
    )
}

export default DashboardPage;