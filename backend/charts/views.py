from rest_framework.response import Response
from rest_framework.decorators import api_view

# API endpoint to return data for the Line Chart
@api_view(['GET'])
def line_chart_data(request):
    data = {
        "labels": ["Jan", "Feb", "Mar", "Apr"],  # X-axis labels
        "data": [10, 20, 30, 40]  # Y-axis data points
    }
    return Response(data)

# API endpoint to return data for the Bar Chart
@api_view(['GET'])
def bar_chart_data(request):
    data = {
        "labels": ["Product A", "Product B", "Product C"],  # X-axis labels
        "data": [100, 150, 200]  # Y-axis data points
    }
    return Response(data)

# API endpoint to return data for the Pie Chart
@api_view(['GET'])
def pie_chart_data(request):
    data = {
        "labels": ["Red", "Blue", "Yellow"],  # Labels for each pie slice
        "data": [300, 50, 100]  # Data values for each slice
    }
    return Response(data)

# API endpoint to return data for the Candlestick Chart
@api_view(['GET'])
def candlestick_chart_data(request):
    data = {
        "data": [
            {"x": "2023-01-01", "open": 30, "high": 40, "low": 25, "close": 35},  # First candlestick
            {"x": "2023-01-02", "open": 35, "high": 45, "low": 30, "close": 40}   # Second candlestick
        ]
    }
    return Response(data)
