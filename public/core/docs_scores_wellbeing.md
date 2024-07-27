---
title: Wellbeing Score
badge: new
navigationTitle: Wellbeing
description: The Wellbeing Score combines insights from both the Activity and Sleep scores, offering a holistic view of the user's overall wellbeing. This score reflects the interplay between physical activity and sleep quality, providing a comprehensive measure of the user's health and lifestyle balance.
---

**Enhance your holistic health understanding.** The Wellbeing Score is a comprehensive measure that integrates sleep quality and physical activity levels to offer a complete perspective on your overall health and wellbeing. This score merges the critical elements of both sleep and activity, providing a unique insight into how these two fundamental aspects of health interplay and influence general wellbeing.

## At-a-Glance: Wellbeing Score

| Key | Values | Description |
| --- | --- | --- |
| type          | `wellbeing`                        | Type of score being calculated. |
| state         | `minimal`, `low`, `medium`, `high` | Overall state of wellbeing based on the score. |
| score         | 0.0 - 1.0                          | Overall wellbeing score, where 1.0 represents optimal. |
| factors       | Array of key-value pairs           | Detailed factors contributing to the overall score. |
| dataSources   | Array of Strings                   | Sources of data used to calculate the score. |
| createdAt     | ISO 8601 DateTime                  | Timestamp of when the score was created. |
| version       | Integer                            | Version of the scoring algorithm. |
| Status        | **PRODUCTION**                     | Score is in production. |

```json
{
	"type": "wellbeing",
	"state": "high",
	"score": 0.90,
	"factors": [
		...
	],
	"dataSources": ["age", "activity", "sleep"],
	"createdAt": "2023-11-11T11:05:41.644Z",
	"version": 1
}
```

### Factor Schema

| Aspect | Details                          | Description              |
| ------ | -------------------------------- | ------------------------ |
| name   | `steps`, `active_hours`, `active_calories`, `intense_activity_duration`, `extended_inactivity`, `floors_climbed`, `sleep_duration`, `sleep_regularity`, `sleep_contiuity`, `sleep_debt`, `circadian_alignment`, `physical_recovery`, `mental_recovery`  | Name of the factor.                                              |
| value  | numerical                                                                                                                             | Actual measured value for the factor.                            |
| goal   | numerical or percentage -specific to each score                                                                                       | Target value for specific to each factor.                        |
| unit   | `activity`, `sleep`, `age`, `gender`                                                                                                  | Unit of measurement for the factor.                              |
| score  | 0.0 - 1.0                                                                                                                             | Factor-specific score, where 1.0 represents optimal performance. |
| state  | `minimal`, `low`, `medium`, `high`                                                                                                    | Current state of the factor based on the factor score.           |

```json
{
	...
	"factors": [
        { "name": "sleep_duration", 
                    "value": 400, 
                    "goal": 480, 
                    "unit": "minutes", 
                    "score": 0.93, 
                    "state": "high" },
            ...
            ]
    ...
}
```

## Wellbeing Factors Explained

**The Wellbeing Score includes factors from the Activity and the Sleep score** to provide an integrated view of behavioural health. The factors are constituents of the overall score, defined through scientific research. Each factor plays a significant role in the overall Wellbeing Score and in defining overall health of the user. Here you will learn the basis behind each factor, the corresponding research papers as well as how to make best use of the schema for your use case.

| Factor   | Definition                         |
| -------- | ---------------------------------- |
| Steps | The total number of steps taken throughout the day |
| Active Hours | The number of hours during which at least step counts are recorded or an exercise is logged |
| Active Calories | The total calories burned during active periods, indicating the intensity and energy cost of activities performed |
| Intense Activity Duration | The duration of moderate to vigorous physical activity |
| Extended Inactivity | The amount of time spent sedentary without breaks |
| Floors Climbed | The number of floors climbed throughout the day |
| Sleep Duration | The total amount of sleep obtained during the night |
| Sleep Regularity | Consistency of bed and wake times across days |
| Sleep Continuity | Measure of how uninterrupted and restful the sleep period is, assessed by the total number of minutes lost due to restlessness,  and awakenings |
| Sleep Debt | The cumulative shortfall of sleep relative to an individual's sleep needs over time. Sleep debt increases in a non-linear fashion as the effects of sleep loss compound more severely as the deficit grows |
| Circadian Alignment | Alignment of sleep timing with an individual's circadian rhythm |
| Physical Recovery | The duration, timing, and number of deep sleep cycles (slow-wave sleep) |
| Mental Recovery | The duration, timing, and number of REM sleep cycles |


{% callout title="Note" %}
For a more in-depth view on how to use the factors Refer to the [Activity Factors](docs/products/scores/activiry) and [Sleep Factors](docs/products/scores/sleep) pages. 
{% /callout %}
---

## Understanding the Wellbeing Score

### How to Read the Score

A higher Wellbeing Score indicates a balanced combination of good sleep quality and active lifestyle. Evaluate each factor's impact to pinpoint areas of excellence or those needing improvement.

### Interpreting the State

- **High**: Reflects exceptional sleep quality and physical activity levels.
- **Medium**: Indicates good sleep and activity patterns, with some room for improvement.
- **Low**: Suggests either sleep quality or physical activity, or both, are below optimal levels.
- **Minimal**: Denotes poor sleep and activity patterns, requiring immediate attention to enhance health.

### Using the Score for Improvement

Focus on improving factors that negatively impact your score. Enhancing sleep regularity or increasing daily steps can have a significant positive effect on your Wellbeing Score.

### Limitations and Considerations

The Wellbeing Score provides a holistic health overview but is not a medical assessment. Individual health conditions and external influences can affect the score. For comprehensive health evaluations, consult healthcare professionals.

{% callout title="Note" %}
Explore our [best practices guide](/docs/guides/best-practices) for optimal use of our products.
{% /callout %}

---

## Wellbeing Score Factors

Incorporates all factors from the Activity and Sleep scores, emphasizing a balanced approach to physical activity and sleep for overall health.

| #   | Factor            | Definition                                                                                                              | Relevance                                                                                                                                      | Optimal Value                                                                                                                              | Reference                                                                                                                                                       |
| --- | ----------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.  | Active Hours      | Represents the number of hours in a day where the individual is sufficiently active, based on a minimum step count.     | This factor assesses the overall activeness throughout the day, crucial for maintaining good health and preventing lifestyle-related diseases. | Ideally, most waking hours should involve some level of physical activity.                                                                 | Buckworth, Janet, and Claudio Nigg. "Physical activity, exercise, and sedentary behavior in college students."                                                  |
| 2.  | Daily Steps       | Counts the average number of steps taken each day.                                                                      | Daily steps are a fundamental measure of physical mobility and overall activity level.                                                         | Aim for at least 10,000 steps per day as a general guideline for good health.                                                              | Zhang, Kuan, et al. "Measurement of human daily physical activity."                                                                                             |
| 3.  | Activity Goals    | Tracks progress towards personalized physical activity targets based on the recommended value for the individual's age. | Meeting activity goals is indicative of a committed and structured approach to physical fitness.                                               | Achieving daily or weekly activity targets tailored to individual fitness levels.                                                          | Dunn, Andrea L., Ross E. Andersen, and John M. Jakicic. "Lifestyle physical activity interventions: History, short-and long-term effects, and recommendations." |
| 4.  | Sedentary Periods | Monitors durations of prolonged inactivity or minimal physical movement.                                                | Prolonged sedentary behavior is linked to various health risks and should be minimized.                                                        | Limiting sedentary periods to less than 8 hours a day, including work-related sitting.                                                     | Owen, Neville, et al. "Too much sitting: the population-health science of sedentary behavior."                                                                  |
| 5.  | Calories Burnt    | Estimates the total number of calories expended through physical activity.                                              | Caloric expenditure is key to understanding the intensity and effectiveness of physical activities.                                            | Varies based on individual metabolic rates and activity levels. Aim for a caloric expenditure that supports your fitness and health goals. | Schwartz, Michael W., et al. "Obesity pathogenesis: an endocrine society scientific statement."                                                                 |
| 6.  | Total Sleep Time    | Measures the total duration of sleep in a given period.                                        | Essential for assessing the adequacy of sleep, which is crucial for overall health and well-being. Adequate sleep is associated with better cognitive function, emotional well-being, and physical health. | 7-9 hours per night for adults, as recommended by sleep experts and health organizations.                 | Schwartz, M.W., et al. (2017). "Obesity pathogenesis: An endocrine society scientific statement."                 |
| 7.  | Night Time Activity | Tracks physical activity during typical sleeping hours.                                        | Indicates disturbances or restlessness during sleep, impacting sleep quality. Frequent night time activity can be a sign of sleep disorders or poor sleep hygiene.                                         | Minimal to no significant activity during sleep hours, indicating uninterrupted and restful sleep.        | Rajaratnam, S.M.W., and Arendt, J. (2001). "Health in a 24-h society.”                                            |
| 8.  | Sleep Regularity    | Measures the consistency of sleep patterns over time.                                          | Regular sleep patterns are linked to better sleep quality and overall health. Irregular sleep patterns can disrupt the circadian rhythm, affecting both mental and physical health.                        | Consistent sleep and wake times daily, including weekends, to maintain circadian rhythm stability.        | Chaput, J.P., et al. (2020). "Sleep timing, sleep consistency, and health in adults: A systematic review."        |
| 9.  | Sleep Routine       | Evaluates the consistency of pre-sleep rituals and timings.                                    | A consistent pre-sleep routine can significantly enhance sleep quality by preparing the body and mind for rest. It aids in faster sleep onset and deeper sleep stages.                                     | Bedtime and wake time that align with natural light-dark cycles, ideally sleeping during nighttime hours. | Wulff, K., et al. (2010). "Sleep and circadian rhythm disruption in psychiatric and neurodegenerative disease."   |
| 10.  | Sleep Debt          | Accumulated deficit of sleep over an extended period compared to the individual’s sleep needs. | Sleep debt is linked to various health risks, including cognitive impairment and mood disorders. It’s a critical factor in understanding long-term sleep sufficiency and health impacts.                   | Minimal to no sleep debt, indicating regular attainment of nightly sleep needs over an extended period.   | Spiegel, K., Leproult, R., and Van Cauter, E. (1999). "Impact of sleep debt on metabolic and endocrine function." |


---

## Frequently Asked Questions (FAQs)

**Q: How can I improve my Wellbeing Score?**

A: Enhance your Wellbeing Score by focusing on improving both your sleep quality and physical activity levels. Regular and consistent improvements in these areas will positively influence your overall wellbeing.

**Q: What does a `high` wellbeing score signify?**

A: A `high` wellbeing score signifies excellent sleep quality combined with a healthy, active lifestyle, indicating a positive state of overall health and wellbeing.

**Q: Can the Wellbeing Score fluctuate based on one aspect (sleep or activity) more than the other?**

A: Yes, the Wellbeing Score can fluctuate if there's a significant change in either sleep quality or physical activity levels. Both factors contribute equally to the overall score, emphasizing the importance of balance in maintaining holistic health.

**Q: Is the Wellbeing Score suitable for all age groups?**

A: The Wellbeing Score is designed to be relevant for adults. While the principles behind the score are universally applicable, the specific thresholds and recommendations are tailored to adult populations.
