---
title: Activity Score
navigationTitle: Activity
description: This model evaluates the user's overall physical activity levels, including factors like daily steps, active hours, and calories burnt. It's designed to provide a comprehensive assessment of physical activity and encourage a healthier, more active lifestyle.
---

**Optimising movement health** The Activity Score is a holistic measure of your physical activity and fitness level. It weaves together diverse aspects of daily activity, offering a comprehensive view of overall physical engagement and its impact on health. This guide elucidates the factors influencing the Activity Score, shedding light on each factor's contribution to fostering a healthier, more active lifestyle.

## At-a-Glance: Activity Score

| Key | Values | Description |
| --- | --- | --- |
| type          | `activity`                         | Type of score being calculated. |
| state         | `minimal`, `low`, `medium`, `high` | Overall state of activity health based on the score. |
| score         | 0.0 - 1.0                          | Overall activity score, where 1.0 represents optimal. |
| factors       | Array of key-value pairs           | Detailed factors contributing to the overall score. |
| dataSources   | Array of Strings                   | Sources of data used to calculate the score. |
| createdAt     | ISO 8601 DateTime                  | Timestamp of when the score was created. |
| version       | Integer                            | Version of the scoring algorithm. |
| Status        | **PRODUCTION**                     | Score is in production. |                                                                          |

```json
{
	"type": "activity",
	"state": "high",
	"score": 0.90,
	"factors": [
		...
	],
	"dataSources": ["age", "activity", "exercise"],
	"createdAt": "2023-11-11T11:05:41.644Z",
	"version": 1
}
```

### Factor Schema

| Aspect | Details                                                        | Description  |
| ------ | -------------------------------------------------------------- | ------------ |
| name   | `steps`, `active_hours`, `active_calories`, `intense_activity_duration`, `extended_inactivity`, `floors_climbed`  | Name of the factor.                                              |
| value  | numerical                                                                                                         | Actual measured value for the factor.                            |
| goal   | numerical or percentage -specific to each score                                                                   | Target value for specific to each factor.                        |
| unit   | `activity`, `age`, `gender`                                                                                       | Unit of measurement for the factor.                              |
| score  | 0.0 - 1.0                                                                                                         | Factor-specific score, where 1.0 represents optimal performance. |
| state  | `minimal`, `low`, `medium`, `high`                                                                                | Current state of the factor based on the factor score.           |


```json
{
	...
	"factors": [
		{ "name": "steps", 
			"value": 8000, 
			"goal": 10000, 
			"unit": "count", 
			"score": 0.93, 
			"state": "high" },
		{ "name": "active_hours", 
			"value": 8, 
			"goal": 12, 
			"unit": "hours", 
			"score": 0.70, 
			"state": "medium" },
		{ "name": "active_calories", 
			"value": 400, 
			"goal": 500, 
			"unit": "kcal", 
			"score": 0.85, 
			"state": "high" },
		{ "name": "intense_activity_duration", 
			"value": 80, 
			"goal": 150, 
			"unit": "minutes", 
			"score": 0.71, 
			"state": "medium" },
		{ "name": "extended_inactivity", 
			"value": 300, 
			"goal": 500, 
			"unit": "hours", 
			"score": 0.71, 
			"state": "medium" },
		{ "name": "floors_climbed", 
			"value": 5, 
			"goal": 10, 
			"unit": "floors", 
			"score": 0.50, 
			"state": "medium" },
	],
	...
}
```

## Factors Explained

The factors are constituents of the overall score defined through scientific research. Each factor plays a significant role in the overall Activity Score and in defining overall movement health of the user. Here you will learn the basis behind each factor, the corresponding research papers as well as how to make best use of the schema for your use case.

| Factor | Definition | Relevance | Reference |
| --- | --- | --- | --- |
| Steps | The total number of steps taken throughout the day | Steps are a fundamental measure of daily activity and are easily tracked. High step counts are associated with lower mortality and morbidity | Tudor-Locke, C., & Bassett, D.R. (2004). "How many steps/day are enough? Preliminary pedometer indices for public health." Sports Medicine, 34(1), 1-8. |
| Active Hours | The number of hours during which at least step counts are recorded or an exercise is logged | Encourages consistent activity throughout the day, reducing sedentary periods which are linked to numerous health issues. | Matthews, C.E., et al. (2008). "Amount of time spent in sedentary behaviors in the United States, 2003-2004." American Journal of Epidemiology, 167(7), 875-881. |
| Active Calories | The total calories burned during active periods, indicating the intensity and energy cost of activities performed | Reflects the overall energy expenditure which is crucial for weight management and cardiovascular health. | Pate, R.R., et al. (1995). "Physical activity and public health. A recommendation from the Centers for Disease Control and Prevention and the American College of Sports Medicine." JAMA, 273(5), 402-407. |
| Intense Activity Duration | The duration of moderate to vigorous physical activity | Beneficial for cardiovascular health and metabolic adaptations. Higher intensity activities contribute more significantly to health benefits. | World Health Organization. (2020). "WHO guidelines on physical activity and sedentary behaviour." Geneva: World Health Organization. |
| Extended Inactivity | The amount of time spent sedentary without breaks | High sedentary time is a risk factor for numerous health issues, so reducing this is crucial. This metric should inversely impact the score. | Ekelund, U., et al. (2016). "Does physical activity attenuate, or even eliminate, the detrimental association of sitting time with mortality? A harmonized meta-analysis of data from more than 1 million men and women." The Lancet, 388(10051), 1302-1310 |
| Floors Climbed | The number of floors climbed throughout the day | Climbing floors requires more energy and effort than walking on a flat surface, contributing to better cardiovascular and muscular health | Lee, I.M., et al. (2003). "Physical activity and coronary heart disease in women: is 'no pain, no gain' passé?" JAMA, 290(10), 1339-1346 |

### Using Activity Factors
The factors are designed to enable many types of user experience, from displaying the measured value for the individual factor to a displaying it as a percentage sub-score a user can optimise. Both are valid implementations− displaying only the score allows simplicity while displaying values enables greater transparency for the user.

| Factor | Score Interpretation | Goal Interpretation | Units | Wearable Only |
| --- | --- | --- | --- | --- |
| Steps | Higher score shows user is getting closer to the step count goal | 10,000 steps per day as per WHO recommendations | count | No |
| Active Hours | Higher score indicates user is closer to the number of active hours goal | 12 active hours (approximately every waking hour) | hours | No |
| Active Calories | Higher score indicates user has burnt higher amount of active calories | 500 active calories per day | kcal | No |
| Intense Activity Duration | Higher score indicates user is in higher  | 150 minutes moderate or 75 minutes vigorous per week | mins | No |
| Extended Inactivity | Higher score indicates better health due to less time spent in long sedentary periods | Less than 8 hours in total per day, with breaks every hour | hours | No |
| Floors Climbed | Higher score indicates higher number of floors traversed by the user  | 10 floors per day | floors | Yes |

## Understanding the Activity Score

### How to Read the Score

A higher score indicates a healthier, more active lifestyle. Analyze the contribution of each factor to identify strengths and areas for enhancement.

### Interpreting the State

- **High**: Reflects excellent physical activity levels and adherence to fitness goals.
- **Medium**: Indicates moderate activity levels with room for improvement.
- **Low**: Suggests insufficient physical activity, highlighting areas needing significant enhancement.
- **Minimal**: Denotes very low activity levels, necessitating urgent action for health improvement.

### Using the Score for Improvement

Focus on factors negatively impacting your score. For instance, increasing daily steps or reducing sedentary periods can substantially improve the score.

### Limitations and Considerations

The Activity Score is an indicator of physical fitness and is not a substitute for professional health advice. Variations in individual health conditions and lifestyle can influence the score.

{% callout title="Note" %}
For effective utilization of our products, we encourage you to explore our [best practices guide.](/docs/guides/best-practices)
{% /callout %}

## Frequently Asked Questions (FAQs)

**Q: How can I improve my Activity Score?**

A: Enhance your Activity Score by achieving daily activity goals, increasing your active hours, and minimizing sedentary periods. Regularly track and adjust your activity levels for continuous improvement.

**Q: What does a `high` activity score indicate?**

A: A `high` activity score indicates robust physical activity, good adherence to fitness goals, and limited sedentary behavior, contributing positively to overall health and fitness.

**Q: Can the Activity Score help in weight management?**

A: Yes, the Activity Score provides insights into your daily physical activity and caloric expenditure, which are crucial factors in weight management. However, it should be complemented with dietary considerations for effective weight management.