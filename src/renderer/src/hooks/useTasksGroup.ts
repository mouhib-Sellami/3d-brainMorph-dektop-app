import React from "react";

const useTasksGroup = () => {

    const convertTimeToSeconds = (timeString) => {
        if (timeString == null)
            return 0

        const [hours, minutes, secondsWithMicro] = timeString.split(':');
        if (secondsWithMicro) {

            const [seconds] = secondsWithMicro.split('.') || "0";
            const hoursInSeconds = parseInt(hours, 10) * 3600;
            const minutesInSeconds = parseInt(minutes, 10) * 60;
            const secondsValue = parseInt(seconds, 10);

            return hoursInSeconds + minutesInSeconds + secondsValue;
        }
        return 0
    };

    const getAverageExecutionTime = React.useCallback((tasks) => {
        const totalSeconds = tasks.map((elm) => convertTimeToSeconds(elm.execution_time));

        const averageSeconds = totalSeconds.reduce((sum, seconds) => sum + seconds, 0) / tasks.length;

        return averageSeconds;
    }, [])

    const getTasksChart = React.useCallback((tasks) => {
        return tasks.map(elm => {
            return convertTimeToSeconds(elm.execution_time || "")
        })
    }, [])

    const getStatusColor = React.useCallback((status) => {
        switch (status.toLowerCase()) {
            case "running":
                return "blue";
            case "finish":
                return "green"
            case "failed":
                return "red"
            case "pending":
                "orange"
        }
        return "blue"
    }, [])

    const groupedByStatus = React.useCallback((tasks) => {
        const grouped = tasks.reduce((acc, task) => {
            acc[task.status] = acc[task.status] || [];
            acc[task.status].push(task);
            return acc;

        }, {});

        const groupedWithCount = Object.keys(grouped).map(status => ({
            name: status,
            value: grouped[status].length,
            color: getStatusColor(status)
        }));

        return groupedWithCount;
    }, []);

    const groupedByIsDone = React.useCallback((tasks) => {
        const doneTasks = tasks.filter(task => task.is_done);
        const notDoneTasks = tasks.filter(task => !task.is_done);

        return [
            { name: 'done', color: "green", value: doneTasks.length },
            { name: 'notDone', color: "red", value: notDoneTasks.length }
        ];
    }, []);

    const groupedByTaskType = React.useCallback((tasks) => {
        const grouped = tasks.reduce((acc, task) => {
            acc[task.task_type] = acc[task.task_type] || [];
            acc[task.task_type].push(task);
            return acc;
        }, {});

        const groupedWithCount = Object.keys(grouped).map(taskType => ({
            taskType,
            count: grouped[taskType].length
        }));

        return groupedWithCount;
    }, []);

    return { groupedByStatus, groupedByIsDone, groupedByTaskType, convertTimeToSeconds, getTasksChart, getAverageExecutionTime };
};

export default useTasksGroup;