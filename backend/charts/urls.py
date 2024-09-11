from django.urls import path
from . import views

urlpatterns = [
    path('line-chart-data/', views.line_chart_data),
    path('bar-chart-data/', views.bar_chart_data),
    path('pie-chart-data/', views.pie_chart_data),
    path('candlestick-chart-data/', views.candlestick_chart_data)
]
